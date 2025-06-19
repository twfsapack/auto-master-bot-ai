
import { ExtendedUser } from './user';

export type { ExtendedUser as User };

export type AuthContextType = {
  user: ExtendedUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  appleSignIn: () => Promise<void>;
  upgradeAccount: () => Promise<void>;
  grantPremiumToEmail: (email: string) => Promise<boolean>;
};
