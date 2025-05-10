
export type User = {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  googleSignIn: () => Promise<void>;
  appleSignIn: () => Promise<void>;
  upgradeAccount: () => void;
  grantPremiumToEmail: (email: string) => boolean;
};
