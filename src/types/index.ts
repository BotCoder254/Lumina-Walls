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

export interface Collection {
  id: string;
  name: string;
  description?: string;
  wallpapers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  favorites: string[];
  collections: Collection[];
  downloads: number;
  createdAt: Date;
  lastLogin: Date;
}

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
} 