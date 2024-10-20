import { Post, User } from "./Models";

export interface PostsGetResponse {
    post: Post;
    user: User;
}
export interface PostsPostRequest {
    content: string;
    media: string;
}
