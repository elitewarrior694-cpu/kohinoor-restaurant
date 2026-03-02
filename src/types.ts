export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}
