/**
 * Custom Post type. Aids in TypeScript checks.
 */
export interface Post {
    id: number;
    title: string;
    body: string;
    username: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    comments: number[];
    game_community_id: number;
    likes: number[]
}

/**
 * A post initial state before the real posts are fetched from the backend.
 */
export const PostInitialState : Post = {
    id: 0,
    title: "",
    body: "",
    username: "",
    created_at: "",
    updated_at: "",
    user_id: 0,
    comments: [],
    game_community_id: 0,
    likes: [],
}