import { User } from "./User";

export type AuthContextType = {
    initialState: User;
    user: User;
    login: (token: string, user: User) => void;
    logout: () => void;
}