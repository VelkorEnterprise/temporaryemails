import { EmailAccount, Message, MessageDetail } from '../types';

export const generateNewEmail = async (): Promise<EmailAccount> => {
    // Placeholder implementation
    return { id: '1', address: 'test@example.com', token: 'token', apiSource: 'mail.tm' };
};

export const fetchInbox = async (token: string, apiSource: string): Promise<Message[]> => {
    return [];
};

export const fetchMessageDetail = async (token: string, messageId: string, apiSource: string): Promise<MessageDetail> => {
    return { id: messageId, from: { address: '', name: '' }, subject: '', intro: '', text: '', html: '' };
};

export const refreshMailTmToken = async (refreshToken: string): Promise<{ token: string, refreshToken: string }> => {
    return { token: 'new-token', refreshToken: 'new-refresh-token' };
};

export const deleteMailTmAccount = async (token: string, accountId: string): Promise<boolean> => {
    return true;
};
