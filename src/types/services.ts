export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // в минутах
  categoryId: string;
  category: string;
  image?: string;
  specialistIds?: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface ServiceFilters {
  category: string | null;
  searchTerm: string;
  priceRange: {
    min: number;
    max: number;
  };
}