import { User } from "./User";

/**
 * The type for the authentication context.
 */
export type AuthContextType = {
    user: User;
    login: (token: string, user: User) => void;
    logout: () => void;
}