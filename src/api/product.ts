import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = () => {
  return axios.get<Product[]>(`${BASE_URL}/products`);
};

export const getProduct = (id: number) => {
  return axios.get<Product>(`${BASE_URL}/products/${id}`);
};

export const getCategories = () => {
  return axios.get<string[]>(`${BASE_URL}/products/categories`);
};

export const getProductsByCategory = (category: string) => {
  return axios.get<Product[]>(`${BASE_URL}/products/category/${category}`);
};

export const updateProduct = (product: Product) => {
  return new Promise<Product>((resolve) => {
    setTimeout(() => resolve(product), 500);
  });
};

export const deleteProduct = (id: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(id), 500);
  });
};
