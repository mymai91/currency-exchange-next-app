import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// API Response types
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Create axios instance with default config
export const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // // Log request in development
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('🚀 API Request:', {
    //     method: config.method?.toUpperCase(),
    //     url: config.url,
    //     params: config.params,
    //     data: config.data,
    //   });
    // }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('✅ API Response:', {
    //     status: response.status,
    //     url: response.config.url,
    //     data: response.data,
    //   });
    // }

    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            // You can add redirect logic here
            // window.location.href = '/login';
          }
          break;

        case 403:
          console.error('❌ Access Forbidden:', data.message);
          break;

        case 404:
          console.error('❌ Resource Not Found:', data.message);
          break;

        case 422:
          console.error('❌ Validation Error:', data.errors);
          break;

        case 429:
          console.error('❌ Too Many Requests');
          break;

        case 500:
        case 502:
        case 503:
          console.error('❌ Server Error:', data.message);
          break;

        default:
          console.error('❌ API Error:', data.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ Network Error: No response received');
    } else {
      // Something else happened
      console.error('❌ Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to handle API errors
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response?.data) {
      return {
        message: axiosError.response.data.message || 'An error occurred',
        status: axiosError.response.status,
        errors: axiosError.response.data.errors,
      };
    }

    if (axiosError.request) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
      };
    }
  }

  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
};
