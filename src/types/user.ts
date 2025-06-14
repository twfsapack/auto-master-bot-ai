
import { User } from '@supabase/supabase-js';

export interface ExtendedUser extends User {
  isPremium?: boolean;
  name?: string;
}

export type UserWithProfile = {
  user: User;
  profile: {
    id: string;
    email: string;
    name: string | null;
    is_premium: boolean;
    created_at: string;
    updated_at: string;
  } | null;
};
