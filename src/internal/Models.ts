export interface Post {
    id: number;
    content: string;
    media: string;
    createdAt: Date;
}

export interface User {
    id: number;
    username: string;
    pfp: string;
    description: string;
}
