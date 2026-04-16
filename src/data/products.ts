export interface ProductPart {
  id: string;
  name: string;
  composition?: string;
  image: string;
  price: number;
  instructions: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  category: string;
  affiliateUrl: string;
  badges: string[];
  composition?: string;
  description?: string;
  parts?: ProductPart[];
}

export const CATEGORIES: string[] = ["Tất cả"];

export const PRODUCTS: Product[] = [];
