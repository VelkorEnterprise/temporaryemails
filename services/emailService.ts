
import { EmailAccount, Message, MessageDetail, ApiSource } from '../types.ts';

const MAIL_TM_API = 'https://api.mail.tm';
const RAPID_API_URL = 'https://free-tempmail-api.p.rapidapi.com';

const RAPID_API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.RAPID_API_KEY : undefined;

const fetchWithTimeout = async (resource: RequestInfo, options: RequestInit & { timeout?: number } = {}) => {
  const { timeout = 8000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

const createMailTmAccount = async (): Promise<EmailAccount> => {
  const domainsRes = await fetchWithTimeout(`${MAIL_TM_API}/domains`);
  if (!domainsRes.ok) throw new Error('Failed to fetch domains from Mail.tm');
  const domains = await domainsRes.json();
  const domain = domains['hydra:member'][0].domain;

  const address = `${Math.random().toString(36).substring(7)}@${domain}`;
  const password = Math.random().toString(36).substring(7);

  const createAccRes = await fetchWithTimeout(`${MAIL_TM_API}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, password }),
  });
  if (!createAccRes.ok) throw new Error('Failed to create account with Mail.tm');
  const accountData = await createAccRes.json();
  
  const tokenRes = await fetchWithTimeout(`${MAIL_TM_API}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
  });
  if (!tokenRes.ok) throw new Error('Failed to get token from Mail.tm');
  const tokenData = await tokenRes.json();

  return { address: accountData.address, token: tokenData.token, id: accountData.id, apiSource: 'mail.tm', password, refreshToken: tokenData.refreshToken };
};

export const refreshMailTmToken = async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
    const tokenRes = await fetchWithTimeout(`${MAIL_TM_API}/token/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
    if (!tokenRes.ok) {
        throw new Error('Failed to refresh token from Mail.tm');
    }
    const tokenData = await tokenRes.json();
    return { 
      token: tokenData.token, 
      refreshToken: tokenData.refreshToken 
    };
}

const createRapidApiAccount = async (): Promise<EmailAccount> => {
    if (!RAPID_API_KEY || RAPID_API_KEY === 'YOUR_RAPIDAPI_KEY_HERE') {
        throw new Error('RapidAPI is not configured.');
    }
    const response = await fetchWithTimeout(`${RAPID_API_URL}/newmail`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'free-tempmail-api.p.rapidapi.com',
            'x-rapidapi-key': RAPID_API_KEY,
        },
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid or unauthorized RapidAPI key.');
    }
    if (!response.ok) throw new Error('Failed to generate email from RapidAPI');
    const data = await response.json();
    if (!data.success || !data.newmail) throw new Error('RapidAPI returned an error or invalid data.');
    
    return { 
        address: data.newmail.email, 
        token: data.newmail.token, 
        id: data.newmail.email,
        apiSource: 'rapidapi' 
    };
};


export const generateNewEmail = async (): Promise<EmailAccount> => {
  let mailTmError: Error | null = null;
  
  try {
    return await createMailTmAccount();
  } catch (error) {
    mailTmError = error instanceof Error ? error : new Error(String(error));
  }

  try {
    return await createRapidApiAccount();
  } catch (fallbackError) {
    const isKeyError = fallbackError instanceof Error && (fallbackError.message.includes('not configured') || fallbackError.message.includes('Invalid or unauthorized'));
    if (isKeyError) {
      throw mailTmError || new Error('Primary email service failed and fallback is not configured.');
    } else {
      throw new Error('Both email services failed. Please check your connection.');
    }
  }
};

export const fetchInbox = async (token: string, apiSource: ApiSource): Promise<Message[]> => {
    if (apiSource === 'mail.tm') {
        const res = await fetchWithTimeout(`${MAIL_TM_API}/messages`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.status === 401) throw new Error('Mail.tm session expired.');
        if (!res.ok) return [];
        const data = await res.json();
        return data['hydra:member'] || [];
    } else { 
        if (!RAPID_API_KEY || RAPID_API_KEY === 'YOUR_RAPIDAPI_KEY_HERE') return [];
        const res = await fetchWithTimeout(`${RAPID_API_URL}/mails`, {
             headers: {
                'x-rapidapi-host': 'free-tempmail-api.p.rapidapi.com',
                'x-rapidapi-key': RAPID_API_KEY,
                'mailtoken': token,
            },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (data.mails || []).map((msg: any) => ({
            id: msg.id,
            from: { name: msg.from.name, address: msg.from.address },
            subject: msg.subject,
            intro: msg.text.substring(0, 100),
            createdAt: msg.date,
        }));
    }
};

export const fetchMessageDetail = async (token: string, messageId: string, apiSource: ApiSource): Promise<MessageDetail> => {
    if (apiSource === 'mail.tm') {
        const res = await fetchWithTimeout(`${MAIL_TM_API}/messages/${messageId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.status === 401) throw new Error('Mail.tm session expired.');
        if (!res.ok) throw new Error('Could not fetch message details.');
        return res.json();
    } else { 
        if (!RAPID_API_KEY || RAPID_API_KEY === 'YOUR_RAPIDAPI_KEY_HERE') throw new Error('RapidAPI key is not configured.');
        const res = await fetchWithTimeout(`${RAPID_API_URL}/read/${messageId}`, {
             headers: {
                'x-rapidapi-host': 'free-tempmail-api.p.rapidapi.com',
                'x-rapidapi-key': RAPID_API_KEY,
                'mailtoken': token,
            },
        });
        if (!res.ok) throw new Error('Could not fetch message details from RapidAPI.');
        const data = await res.json();
        return {
            id: data.mail.id,
            from: data.mail.from,
            subject: data.mail.subject,
            intro: data.mail.text.substring(0, 100),
            createdAt: data.mail.date,
            text: data.mail.text,
            html: data.mail.html
        };
    }
};

export const deleteMailTmAccount = async (token: string, accountId: string): Promise<boolean> => {
  const res = await fetchWithTimeout(`${MAIL_TM_API}/accounts/${accountId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.ok;
}
