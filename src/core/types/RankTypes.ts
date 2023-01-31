export interface Rank {
    created_at: string,
    id: number,
    points: number,
    user_id: string,
    profiles: {
        id: string,
        updated_at: string,
        username: string,
        full_name: string,
        avatar_url: string,
        website: string;
    };
}