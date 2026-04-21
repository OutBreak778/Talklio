type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  requiresVerification?: boolean;

  // Actions
  register: (name?: string, email: string, password: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};
