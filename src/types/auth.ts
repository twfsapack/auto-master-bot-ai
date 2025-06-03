
export type User = {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
};

/**
 * Represents the minimal user data stored in localStorage for session purposes.
 */
export type UserSessionData = {
  /** Unique identifier for the user. */
  id: string;
  /** User's email address. */
  email: string;
  /** User's display name. */
  name: string;
  /** Flag indicating premium status. */
  isPremium: boolean;
};

/**
 * Defines the shape of the authentication context.
 * Includes the current user, loading state, and various authentication methods.
 */
export type AuthContextType = {
  /** The currently authenticated user object, or null if not logged in. */
  user: User | null;
  /** True if an authentication operation is currently in progress. */
  isLoading: boolean;
  /**
   * Logs in a user with email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A promise that resolves when login is complete.
   */
  login: (email: string, password: string) => Promise<void>;
  /**
   * Registers a new user.
   * @param email - The new user's email.
   * @param password - The new user's password.
   * @param name - The new user's name.
   * @returns A promise that resolves when registration is complete.
   */
  register: (email: string, password: string, name: string) => Promise<void>;
  /** Logs out the current user. */
  logout: () => void;
  /**
   * Initiates sign-in with Google.
   * @returns A promise that resolves when Google sign-in is complete.
   */
  googleSignIn: () => Promise<void>;
  /**
   * Initiates sign-in with Apple.
   * @returns A promise that resolves when Apple sign-in is complete.
   */
  appleSignIn: () => Promise<void>;
  /** Upgrades the current user's account to premium. */
  upgradeAccount: () => void;
  /**
   * Grants premium access to a specified email. (Admin or mock functionality)
   * @param email - The email to grant premium access to.
   * @returns True if premium access was granted, false otherwise.
   */
  grantPremiumToEmail: (email: string) => boolean;
};
