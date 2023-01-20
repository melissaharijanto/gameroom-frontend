/**
 * Custom Comment type. Aids in TypeScript checks.
 */
export interface Comment {
    id: number;
    body: string;
    username: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    likes: number[]
}

/**
 * A comment initial state before the real comments 
 * are fetched from the backend.
 */
export const CommentInitialState : Comment = {
    id: 0,
    body: "",
    username: "",
    created_at: "",
    updated_at: "",
    user_id: 0,
    likes: [],
}