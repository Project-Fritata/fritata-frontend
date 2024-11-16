import {
    Flex,
    useDisclosure,
    useToast,
    useBreakpointValue,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import CreatePostModal from "@/components/CreatePostModal";
import { User } from "@/internal/Models";
import { useEffect, useState } from "react";
import { Logout } from "@/internal/api/AuthApi";
import { GetUserByAuth } from "@/internal/api/UsersApi";
import NavContent from "@/components/NavContent";
const Home = () => {
    const navigate = useNavigate();
    const isMobile = useBreakpointValue({ base: true, md: false });

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
        <Flex direction={isMobile ? "column" : "row"} width={"100%"}>
            <Flex
                direction={isMobile ? "row" : "column"}
                alignItems={"center"}
                justifyContent={"space-around"}
                width={isMobile ? "100%" : "20%"}
                height={isMobile ? "70px" : "100vh"}
                padding={2}
                position={"fixed"}
                top={isMobile ? undefined : 0}
                bottom={isMobile ? 0 : undefined}
                left={isMobile ? undefined : 0}
                zIndex={1}
                borderTop={isMobile ? "1px solid black" : undefined}
                roundedTop={isMobile ? 10 : undefined}
                backgroundColor={"white"}
            >
                <NavContent
                    isMobile={isMobile}
                    user={user}
                    navigate={navigate}
                    onCreatePostOpen={onCreatePostOpen}
                    onLogout={onLogout}
                />
            </Flex>
            <Flex
                flexGrow={1}
                direction={"column"}
                alignItems={"center"}
                width={isMobile ? "100%" : "60%"}
                height={isMobile ? "calc(100% - 70px)" : "100%"}
                padding={5}
                paddingLeft={isMobile ? undefined : 0}
                marginLeft={isMobile ? undefined : "20%"}
                marginBottom={isMobile ? "70px" : undefined}
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
