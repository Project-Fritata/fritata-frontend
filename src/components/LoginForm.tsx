import {
    Alert,
    AlertDescription,
    AlertIcon,
    Button,
    Center,
    CircularProgress,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
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
                setError(data.message);
            }
        } catch (error: any) {
            setError("Error sending request");
        } finally {
            setLoading(false);
        }
    };

    const onLoginSuccess = () => {
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
                    <Button variant="outline" width={"full"} type="submit">
                        {loading ? (
                            <CircularProgress
                                isIndeterminate
                                size="24px"
                                color="teal"
                            />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Center>
            </form>

            {error && (
                <Alert status="error" borderRadius={4} mt={6}>
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </>
    );
};

export default LoginForm;
