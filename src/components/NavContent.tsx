import { User } from "@/internal/Models";
import {
    Avatar,
    Button,
    Icon,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from "@chakra-ui/react";
import {
    IconEggFried,
    IconHome,
    IconLogin,
    IconLogout,
    IconPlus,
    IconUser,
} from "@tabler/icons-react";
import { NavigateFunction, useLocation } from "react-router-dom";

const NavContent = ({
    isMobile,
    user,
    navigate,
    onCreatePostOpen,
    onLogout,
}: {
    isMobile: boolean | undefined;
    user: User | undefined;
    navigate: NavigateFunction;
    onCreatePostOpen: () => void;
    onLogout: () => void;
}) => {
    const location = useLocation();
    
    return (
        <>
            {isMobile ? (
                <>
                    <Icon as={IconEggFried} boxSize={8} marginX={5} />
                    {user !== undefined && (
                        <IconButton
                            icon={<Icon boxSize={8} as={IconHome} />}
                            aria-label={"Home"}
                            variant={location.pathname === "/" ? "outline" : "ghost"}
                            padding={5}
                            colorScheme="red"
                            onClick={() => navigate("/")}
                        />
                    )}
                    {user !== undefined && (
                        <IconButton
                            icon={<Icon boxSize={6} as={IconPlus} />}
                            aria-label={"Post"}
                            padding={5}
                            colorScheme="red"
                            onClick={onCreatePostOpen}
                        />
                    )}
                    {user !== undefined && (
                        <IconButton
                            icon={<Icon boxSize={8} as={IconUser} />}
                            aria-label={"Profile"}
                            variant={location.pathname === "/profile" ? "outline" : "ghost"}
                            padding={5}
                            colorScheme="red"
                            onClick={() =>
                                navigate("/profile")
                            }
                        />
                    )}
                    {user == undefined && (
                        <IconButton
                            icon={<Icon boxSize={8} as={IconLogin} />}
                            aria-label={"Login / register"}
                            variant={"ghost"}
                            padding={5}
                            colorScheme="red"
                            onClick={() => navigate("/auth")}
                        />
                    )}
                    {user != undefined && (
                        <IconButton
                            icon={<Icon boxSize={8} as={IconLogout} />}
                            aria-label={"Logout"}
                            variant={"ghost"}
                            padding={5}
                            colorScheme="red"
                            onClick={onLogout}
                        />
                    )}
                </>
            ) : (
                <>
                    <Icon as={IconEggFried} boxSize={100} marginBottom={5} />

                    <Button
                        width={"100%"}
                        leftIcon={<Icon as={IconHome} />}
                        variant={location.pathname === "/" ? "outline" : "ghost"}
                        marginBottom={2}
                        colorScheme="red"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </Button>
                    {user && (
                        <>
                            <Button
                                width={"100%"}
                                leftIcon={<Icon as={IconUser} />}
                                variant={location.pathname === "/profile" ? "outline" : "ghost"}
                                marginBottom={2}
                                colorScheme="red"
                                onClick={() =>
                                    navigate("/profile")
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
                            onClick={() => navigate("/auth")}
                        >
                            Login / register
                        </Button>
                    )}
                </>
            )}
        </>
    );
};

export default NavContent;
