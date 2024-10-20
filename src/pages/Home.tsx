import {
    Avatar,
    Image,
    Button,
    Icon,
    Spacer,
    Flex,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
} from "@chakra-ui/react";
import { IconHome, IconLogout, IconUser } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import CreatePost from "@/components/CreatePost";
import { User } from "@/internal/Models";
import { useEffect, useState } from "react";
const Home = () => {
    const navigate = useNavigate();

    const {
        isOpen: isCreatePostOpen,
        onOpen: onCreatePostOpen,
        onClose: onCreatePostClose,
    } = useDisclosure();

    const logoutStatusToast = useToast();
    const onLogout = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            if (response.ok) {
                logoutStatusToast({
                    title: "Logged out",
                    status: "success",
                    isClosable: true,
                });
            } else {
                logoutStatusToast({
                    title: "Error logging out",
                    description: data.message,
                    status: "error",
                    isClosable: true,
                });
            }
        } catch (error: any) {
            logoutStatusToast({
                title: "Error logging out",
                description: error.message,
                status: "error",
                isClosable: true,
            });
        } finally {
            navigate("/fritata-frontend/auth");
        }
    };

    const [user, setUser] = useState<User>();
    const getUserByAuth = async () => {
        const response = await fetch("http://localhost:8010/api/v1/users/", {
            method: "GET",
            credentials: "include",
        });
        const data: User = await response.json();
        if (response.ok) {
            setUser(data);
        } else {
            setUser(undefined);
        }
    };
    useEffect(() => {
        getUserByAuth();
    }, []);

    return (
        <Flex direction={"row"} width={"100%"}>
            <Flex
                direction={"column"}
                alignItems={"center"}
                width={"20%"}
                height={"100vh"}
                padding={5}
            >
                <Image
                    boxSize={"100px"}
                    src={"egg-fried.svg"}
                    marginBottom={5}
                />

                <Button
                    width={"100%"}
                    leftIcon={<Icon as={IconHome} />}
                    variant={"outline"}
                    marginBottom={2}
                    colorScheme="red"
                    onClick={() => navigate("/fritata-frontend/")}
                >
                    Home
                </Button>
                <Button
                    width={"100%"}
                    leftIcon={<Icon as={IconUser} />}
                    variant={"outline"}
                    marginBottom={2}
                    colorScheme="red"
                    onClick={() => navigate("/fritata-frontend/profile")}
                >
                    Profile
                </Button>
                <Button
                    width={"100%"}
                    colorScheme="red"
                    onClick={onCreatePostOpen}
                >
                    Post
                </Button>
                <Spacer />
                <Menu placement="top">
                    <MenuButton
                        as={Button}
                        variant="outline"
                        colorScheme="red"
                        paddingY={6}
                        leftIcon={<Avatar size="sm" src={user?.pfp} />}
                        width="100%"
                    >
                        {user?.username}
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            icon={<Icon as={IconLogout} />}
                            onClick={onLogout}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex
                direction={"column"}
                alignItems={"center"}
                width={"60%"}
                height={"100vh"}
                padding={5}
            >
                <Outlet />
            </Flex>
            <CreatePost isOpen={isCreatePostOpen} onClose={onCreatePostClose} />
        </Flex>
    );
};

export default Home;
