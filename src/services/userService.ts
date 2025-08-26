import { User } from '../types/User';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users. Please try again later.');
  }
};