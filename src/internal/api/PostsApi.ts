import { PostsGetResponse } from "../Models";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

const URL_API = "http://localhost:8020/api/v1/posts";

export const GetPosts = async (
    offset: number,
    limit: number
): Promise<ApiResponse<PostsGetResponse[]>> => {
    const response = await fetch(`${URL_API}?offset=${offset}&limit=${limit}`);
    if (response.ok) {
        const posts: PostsGetResponse[] = await response.json();
        return { success: true, data: posts };
    } else {
        const body = await response.json();
        return { success: false, error: body.message };
    }
};

export const CreatePost = async (
    content: string,
    media: string
): Promise<ApiResponse<ApiResponse<null>>> => {
    const response = await fetch(`${URL_API}`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
            media,
        }),
        credentials: "include",
    });
    if (response.ok) {
        return { success: true };
    } else {
        const body = await response.json();
        return { success: false, error: body.message };
    }
};
