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