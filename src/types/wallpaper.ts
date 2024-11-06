export interface Wallpaper {
  id: string;
  urls: {
    regular: string;
    full: string;
    raw: string;
  };
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  likes: number;
  description: string;
} 