// Simple configuration for Unsplash API
export const UNSPLASH_CONFIG = {
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  baseUrl: 'https://api.unsplash.com',
  endpoints: {
    photos: '/photos',
    search: '/search/photos'
  }
};

// Photo options
export const PHOTO_OPTIONS = {
  perPage: 12,
  orderBy: 'latest'
};

// Define the categories with proper typing
export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured', collectionId: '317099' },
  { id: 'nature', label: 'Nature', collectionId: '3330448' },
  { id: 'minimal', label: 'Minimal', collectionId: '3330445' },
  { id: 'dark', label: 'Dark', collectionId: '4468906' },
  { id: 'abstract', label: 'Abstract', collectionId: '4468907' },
  { id: 'colorful', label: 'Colorful', collectionId: '4468908' }
] as const;

// Create a type-safe mapping of category IDs to collection IDs
export const COLLECTIONS: Record<string, string> = CATEGORIES.reduce((acc, category) => {
  if ('collectionId' in category) {
    acc[category.id.toUpperCase()] = category.collectionId;
  }
  return acc;
}, {} as Record<string, string>); 