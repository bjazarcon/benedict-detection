export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Researcher' | 'Agronomist' | 'Student' | 'Guest User';
  avatar?: string;
}

export interface RipenessInfo {
  stage: string;
  colorIndicator: string;
  shelfLife: string;
  firmness: string;
}

export interface NutritionInfo {
  calories: string;
  vitaminC: string;
  dietaryFiber: string;
  potassium: string;
  naturalSugars: string;
  hydration: string;
}

export interface ImageProcessingMetrics {
  dominantColorHex: string[];
  colorSpace: string;
  textureDescription: string;
  shapeEccentricity: string;
  edgeProfile: string;
  suggestedFilters: string[];
}

export interface FruitDetectionResult {
  id: string;
  timestamp: string;
  imageUrl: string;
  isFruit: boolean;
  detectedNonFruitCategory?: string;
  rejectionReason?: string;
  name: string;
  scientificName: string;
  family: string;
  variety?: string;
  confidence: number;
  benefits: string[];
  information: string;
  origin: string;
  ripeness: RipenessInfo;
  nutrition: NutritionInfo;
  imageProcessingData: ImageProcessingMetrics;
  detectionSource?: string;
}

export type ViewState = 'LOGIN' | 'DASHBOARD' | 'CAMERA' | 'DETECTION_LOADING' | 'FLASH_INFO' | 'DETECTION_REJECTED';

export type FilterMode = 'original' | 'grayscale' | 'sobel' | 'threshold' | 'histogram';
