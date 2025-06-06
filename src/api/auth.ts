import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface AuthResponse {
  token: string;
}

// Liste des utilisateurs
export const getUsers = () => {
  return axios.get<User[]>(`${BASE_URL}/users`);
};

// Connexion utilisateur
export const loginUser = (username: string, password: string) => {
  return axios.post<AuthResponse>(`${BASE_URL}/auth/login`, {
    username,
    password,
  });
};
