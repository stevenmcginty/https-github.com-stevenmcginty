export interface Seller {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface CarSpecs {
  zeroToSixty: string;
  horsepower: number;
  engine?: string;
  mpg?: string;
  topSpeed?: string;
  transmission?: string;
  drivetrain?: string;
}

export type MediaType = 'image' | 'video' | 'youtube';

export interface Car {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileage: string;
  mediaType: MediaType;
  mediaUrl: string; // URL for image/video or YouTube Video ID
  posterUrl?: string; // Fallback image
  description: string;
  specs: CarSpecs;
  seller: Seller;
  likes: number;
  isFeatured?: boolean;
}