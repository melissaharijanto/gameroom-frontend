export interface GameCommunities {
    gameCommunity: GameCommunity[]
}

export interface GameCommunity {
    id: number;
    title: string;
    image_url: string;
    icon_url: string;
    created_at: string;
    updated_at: string;
}