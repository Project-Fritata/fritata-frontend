import { User } from "../Models";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

const URL_API = "http://localhost:8010/api/v1/users";

export const GetUserByUsername = async (
    username: string
): Promise<ApiResponse<User>> => {
    const response = await fetch(`${URL_API}/${username}`);
    if (response.ok) {
        const user: User = await response.json();
        return { success: true, data: user };
    } else {
        const body = await response.json();
        return { success: false, error: body.message };
    }
};

export const GetUserByAuth = async (): Promise<ApiResponse<User>> => {
    const response = await fetch(URL_API, {
        method: "GET",
        credentials: "include",
    });
    if (response.ok) {
        const user: User = await response.json();
        return { success: true, data: user };
    } else {
        const body = await response.json();
        return { success: false, error: body.message };
    }
};

export const UpdateUser = async (user: User): Promise<ApiResponse<User>> => {
    const response = await fetch("http://localhost:8010/api/v1/users/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: user.username,
            pfp: user.pfp,
            description: user.description,
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
