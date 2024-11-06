// Simple configuration for Unsplash API
export const UNSPLASH_CONFIG = {
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  baseUrl: 'https://api.unsplash.com',
  collections: {
    featured: '317099',
    nature: '3330448',
    minimal: '3330445',
    dark: '4468906'
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
  { id: '317099', label: 'Featured' },
  { id: '3330448', label: 'Nature' },
  { id: '3330445', label: 'Minimal' },
  { id: '4468906', label: 'Dark' },
  { id: '4468907', label: 'Abstract' },
  { id: '4468908', label: 'Colorful' }
] as const;

// Create a type-safe mapping of category IDs to collection IDs
export const COLLECTIONS: Record<string, string> = CATEGORIES.reduce((acc, category) => {
  if ('collectionId' in category) {
    acc[category.id.toUpperCase()] = category.collectionId;
  }
  return acc;
}, {} as Record<string, string>); 