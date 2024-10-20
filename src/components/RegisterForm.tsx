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

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerStatusToast = useToast();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Registering...");
    const navigate = useNavigate();

    const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                await onRegisterSuccess();
            } else {
                registerStatusToast({
                    title: "Error registering",
                    description: data.message,
                    status: "error",
                    isClosable: true,
                });
            }
        } catch (error: any) {
            registerStatusToast({
                title: "Error registering",
                description: error.message,
                status: "error",
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const onRegisterSuccess = async () => {
        registerStatusToast({
            title: "Account created",
            description: "Logging in...",
            status: "success",
            isClosable: true,
        });
        setLoadingText("Logging in...");

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
                registerStatusToast({
                    title: "Error logging in",
                    description: data.message,
                    status: "error",
                    isClosable: true,
                });
            }
        } catch (error: any) {
            registerStatusToast({
                title: "Error logging in",
                description: error.message,
                status: "error",
                isClosable: true,
            });
        }
    };

    const onLoginSuccess = () => {
        registerStatusToast({
            title: "Login successful",
            status: "success",
            isClosable: true,
        });
        navigate("/fritata-frontend/");
    };

    return (
        <>
            <Heading size={"lg"} mb={2}>
                Register
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
                        loadingText={loadingText}
                        variant="outline"
                        width={"full"}
                        type="submit"
                    >
                        Register
                    </Button>
                </Center>
            </form>
        </>
    );
};

export default RegisterForm;
