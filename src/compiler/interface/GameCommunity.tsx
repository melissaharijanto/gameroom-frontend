/**
 * Custom GameCommunity type. Aids in TypeScript checks.
 */
export interface GameCommunity {
    id: number;
    title: string;
    image_url: string;
    icon_url: string;
    created_at: string;
    updated_at: string;
    followers: number[];
    posts: number[];
}

/**
 * A game community initial state before the real communities
 * are fetched from the backend.
 */
export const GameCommunityInitialValue : GameCommunity = {
    id: 0,
    title: "",
    image_url: "",
    icon_url: "",
    created_at: "",
    updated_at: "",
    followers: [],
    posts: []
}