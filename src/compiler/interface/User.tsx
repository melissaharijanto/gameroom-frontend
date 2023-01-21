/**
 * Custom User type. Aids in TypeScript checks.
 */
export interface User {
    id: number;
    username: string;
}

/**
 * A user initial state before the real user data is fetched from the backend.
 */
export const UserInitialState : User = {
    id: 0,
    username: ""
}