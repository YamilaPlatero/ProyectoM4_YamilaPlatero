export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export interface Tarea {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string | number;
  updatedAt?: string | number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
