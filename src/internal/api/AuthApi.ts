interface ApiResponse {
    success: boolean;
    error?: string;
}

const URL_API_CLIENT = "https://50.17.141.235.nip.io/api/v1/auth";

export const Register = async (
    email: string,
    password: string
): Promise<ApiResponse> => {
    const response = await fetch(`${URL_API_CLIENT}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    if (response.ok) {
        return { success: true };
    } else {
        const body = await response.json();
        return { success: false, error: body.message };
    }
};

export const Login = async (
    email: string,
    password: string
): Promise<ApiResponse> => {
    const response = await fetch(`${URL_API_CLIENT}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
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

export const Logout = async (): Promise<ApiResponse> => {
    const response = await fetch(`${URL_API_CLIENT}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        return { success: true };
    } else {
        const body = await response.json();
        return { success: false, error: body.message };
    }
};
