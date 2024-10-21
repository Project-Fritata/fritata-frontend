import {
    Avatar,
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
import {
    IconEggFried,
    IconHome,
    IconLogin,
    IconLogout,
    IconUser,
} from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import CreatePostModal from "@/components/CreatePostModal";
import { User } from "@/internal/Models";
import { useEffect, useState } from "react";
import { Logout } from "@/internal/api/AuthApi";
import { GetUserByAuth } from "@/internal/api/UsersApi";
const Home = () => {
    const navigate = useNavigate();

    const {
        isOpen: isCreatePostOpen,
        onOpen: onCreatePostOpen,
        onClose: onCreatePostClose,
    } = useDisclosure();

    const logoutStatusToast = useToast();
    const onLogout = async () => {
        const response = await Logout();
        if (response.success) {
            logoutStatusToast({
                title: "Logged out",
                status: "success",
                isClosable: true,
            });
        } else {
            logoutStatusToast({
                title: "Error logging out",
                description: response.error,
                status: "error",
                isClosable: true,
            });
        }
        navigate("/fritata-frontend/auth");
    };

    const [user, setUser] = useState<User>();
    const getUserByAuth = async () => {
        const response = await GetUserByAuth();
        if (response.success) {
            setUser(response.data);
        }
    };
    useEffect(() => {
        getUserByAuth();
    }, []);

    const [trigger, setTrigger] = useState(0);

    return (
        <Flex direction={"row"} width={"100%"}>
            <Flex
                direction={"column"}
                alignItems={"center"}
                width={"20%"}
                height={"100vh"}
                padding={5}
            >
                <Icon as={IconEggFried} boxSize={"100px"} marginBottom={5} />

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
                {user && (
                    <>
                        <Button
                            width={"100%"}
                            leftIcon={<Icon as={IconUser} />}
                            variant={"outline"}
                            marginBottom={2}
                            colorScheme="red"
                            onClick={() =>
                                navigate("/fritata-frontend/profile")
                            }
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
                    </>
                )}

                <Spacer />
                {user ? (
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
                ) : (
                    <Button
                        variant="outline"
                        colorScheme="red"
                        paddingY={6}
                        leftIcon={<Icon as={IconLogin} />}
                        width="100%"
                        onClick={() => navigate("/fritata-frontend/auth")}
                    >
                        Login / register
                    </Button>
                )}
            </Flex>
            <Flex
                direction={"column"}
                alignItems={"center"}
                width={"60%"}
                height={"100vh"}
                padding={5}
            >
                <Outlet key={trigger} />
            </Flex>
            <CreatePostModal
                isOpen={isCreatePostOpen}
                onClose={onCreatePostClose}
                onPostSuccess={() => {
                    setTrigger((prevTrigger) => prevTrigger + 1);
                }}
            />
        </Flex>
    );
};

export default Home;
