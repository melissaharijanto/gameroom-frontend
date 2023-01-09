export interface User {
    id: number;
    username: string;
    password_digest: string;
    created_at: string;
    updated_at: string;
}

export const UserInitialState : User = {
    id: 0,
    username: "",
    password_digest: "",
    created_at: "",
    updated_at: "",
}