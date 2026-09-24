export type CropCategory = 'fertilisers' | 'water-soluble' | 'micronutrients' | 'bio-fertilisers' | 'plant-nutrition';

export type SuitableCrop = 'Chilli' | 'Rice' | 'Cotton' | 'Vegetables' | 'Pulses' | 'Sugarcane' | 'Horticulture';

export type CropStage = 'Nursery / Early Growth' | 'Vegetative Stage' | 'Flowering & Blooming' | 'Fruit & Grain Setting' | 'Maturity & Harvest';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductPackOption {
  size: string;
  price: number;
  originalPrice: number;
  sku: string;
}

export interface NutrientBreakdown {
  label: string;
  percentage: string;
  role: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  category: CropCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  gallery: string[];
  description: string;
  longDescription: string;
  packSize: string;
  packSizes: ProductPackOption[];
  nutrients: NutrientBreakdown[];
  composition: string;
  suitableCrops: SuitableCrop[];
  cropStages: CropStage[];
  application: {
    method: 'Foliar Spray' | 'Fertigation / Drip' | 'Soil Application' | 'Basal & Top Dressing';
    dosage: string;
    waterVolume: string;
    timing: string;
  };
  rating: number;
  reviewCount: number;
  featured: boolean;
  popular: boolean;
  stockStatus: StockStatus;
  sku: string;
  highlights: string[];
  scientificRationale: string;
}

export interface CropInfo {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  image: string;
  heroImage: string;
  description: string;
  scientificName: string;
  season: string;
  soilPreference: string;
  keyNutrientNeeds: string[];
  stages: {
    stage: CropStage;
    duration: string;
    description: string;
    recommendedNutrients: string;
    keyRisk: string;
  }[];
  productCount: number;
}

export interface CategoryInfo {
  id: CropCategory;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  keyBenefits: string[];
  iconName: string;
  productCount: number;
}
