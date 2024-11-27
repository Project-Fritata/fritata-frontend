import { Login, Register } from "@/internal/api/AuthApi";
import { UsernameCheckValidity } from "@/internal/EmailUsernameCheck";
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const registerStatusToast = useToast();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Registering...");
    const navigate = useNavigate();

    const handleUsernameChange = (e: any) => {
        const value = e.target.value;
        if (UsernameCheckValidity(value)) {
            setUsername(value);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const response = await Register(email, password, username);
        if (response.success) {
            await onRegisterSuccess();
        } else {
            registerStatusToast({
                title: "Error registering",
                description: response.error,
                status: "error",
                isClosable: true,
            });
        }
        setLoading(false);
    };
    const onRegisterSuccess = async () => {
        registerStatusToast({
            title: "Account created",
            description: "Logging in...",
            status: "success",
            isClosable: true,
        });
        setLoadingText("Logging in...");

        const response = await Login(email, password);
        if (response.success) {
            onLoginSuccess();
        } else {
            registerStatusToast({
                title: "Error logging in",
                description: response.error,
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
        navigate("/");
    };

    return (
        <>
            <Heading size={"lg"} mb={2}>
                Register
            </Heading>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <FormControl isRequired mt={2}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        mt={-2}
                        type={"email"}
                        value={email}
                        onChange={() => setEmail(email)}
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
                <FormControl isRequired mt={2}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        mt={-2}
                        type={"username"}
                        value={username}
                        onChange={handleUsernameChange}
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
