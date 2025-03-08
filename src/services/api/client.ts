// services/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a singleton axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('token');
          break;
        case 403:
          // Handle forbidden
          console.error('Access forbidden:', error.response.data);
          break;
        default:
          // Handle other errors
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Handle network errors
      console.error('Network error - no response received:', error.request);
    } else {
      // Handle other errors
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API client interface
interface ApiClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

// Implement the API client
const apiClient: ApiClient = {
  // GET request
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(url, config);
    return response.data;
  },
  
  // POST request
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
    return response.data;
  },
  
  // PUT request
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
    return response.data;
  },
  
  // DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return response.data;
  }
};

export default apiClient;