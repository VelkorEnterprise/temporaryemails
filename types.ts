import type { ReactNode } from 'react';

export type ApiSource = 'mail.tm' | 'rapidapi';

export interface EmailAccount {
  address: string;
  token: string;
  id: string;
  apiSource: ApiSource;
  password?: string;
  refreshToken?: string;
}

export interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject: string;
  intro: string;
  createdAt: string;
}

export interface MessageDetail extends Message {
  text: string;
  html: string[];
  address?: string;
}

export interface Article {
  slug: string;
  title: string;
  thumbnail: string;
  description: string;
  author: string;
  date: string;
  content: ReactNode;
}