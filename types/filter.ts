import { CropCategory, SuitableCrop, CropStage } from './product';

export type SortOption = 'featured' | 'popular' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

export interface FilterState {
  searchQuery: string;
  categories: CropCategory[];
  crops: SuitableCrop[];
  stages: CropStage[];
  minPrice: number;
  maxPrice: number;
  packSizes: string[];
  inStockOnly: boolean;
  sortBy: SortOption;
}
