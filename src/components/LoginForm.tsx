import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginStatusToast = useToast();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (response.ok) {
                onLoginSuccess();
            } else {
                loginStatusToast({
                    title: "Error logging in",
                    description: data.message,
                    status: "error",
                    isClosable: true,
                });
            }
        } catch (error: any) {
            loginStatusToast({
                title: "Error logging in",
                description: error.message,
                status: "error",
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const onLoginSuccess = () => {
        loginStatusToast({
            title: "Login successful",
            status: "success",
            isClosable: true,
        });
        navigate("/fritata-frontend/");
    };

    return (
        <>
            <Heading size={"lg"} mb={2}>
                Login
            </Heading>

            <form onSubmit={handleSumbit}>
                <FormControl isRequired mt={2}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        mt={-2}
                        type={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl mt={2} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        mt={-2}
                        type={"password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Center mt={4}>
                    <Button
                        isLoading={loading}
                        loadingText="Logging in..."
                        variant="outline"
                        width={"full"}
                        type="submit"
                    >
                        Login
                    </Button>
                </Center>
            </form>
        </>
    );
};

export default LoginForm;
