export enum Tone {
  PROFESSIONAL = 'Professional',
  WITTY = 'Witty',
  URGENT = 'Urgent',
  INSPIRATIONAL = 'Inspirational',
  CASUAL = 'Casual',
}

export enum Platform {
  LINKEDIN = 'LinkedIn',
  TWITTER = 'Twitter',
  INSTAGRAM = 'Instagram',
}

export type PlatformKey = 'linkedin' | 'twitter' | 'instagram';

export interface Post {
  platform: Platform;
  text: string;
  imageUrl: string;
  aspectRatio: '1:1' | '16:9' | '4:5';
}

export interface GeneratedContent {
  linkedin: Omit<Post, 'platform' | 'aspectRatio'>;
  twitter: Omit<Post, 'platform' | 'aspectRatio'>;
  instagram: Omit<Post, 'platform' | 'aspectRatio'>;
}

export interface SocialPost extends Post {}
