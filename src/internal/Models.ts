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

export interface PostsGetResponse {
    post: Post;
    user: User;
}
export interface PostsPostRequest {
    content: string;
    media: string;
}
