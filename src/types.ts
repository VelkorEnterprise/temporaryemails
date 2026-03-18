export interface EmailAccount {
  id: string;
  address: string;
  token: string;
  refreshToken?: string;
  apiSource: 'mail.tm' | 'other';
}

export interface Message {
  id: string;
  from: { address: string; name: string };
  subject: string;
  intro: string;
}

export interface MessageDetail extends Message {
  text: string;
  html: string;
  address?: string;
}

export interface Article {
  title: string;
  content: string;
}
