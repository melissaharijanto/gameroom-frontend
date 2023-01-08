import { User } from "./User";

export type AuthContextType = {
    user: User;
    login: (token: string, user: User) => void;
    logout: () => void;
}