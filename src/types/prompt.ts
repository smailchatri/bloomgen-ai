export interface Prompt {
  id: string;
  title: string;
  category: string;
  image_url: string;
  prompt_text: string;
  gender?: string;
}

export interface User {
  id: string;
  username: string;
  joined: string;
  isPro: boolean;
  savedPrompts: string[];
}
