import { User } from "@/internal/Models";
import {
    Avatar,
    Flex,
    Heading,
    HStack,
    VStack,
    Text,
    Card,
    CardBody,
    IconButton,
    Icon,
    Spacer,
    useDisclosure,
    useToast,
    useBreakpointValue,
} from "@chakra-ui/react";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditProfileText from "./EditProfileText";
import {
    GetUserByAuth,
    GetUserByUsername,
    UpdateUser,
} from "@/internal/api/UsersApi";

const Profile = () => {
    const usernameParam = useParams().username;

    const isMobile = useBreakpointValue({ base: true, md: false });

    const [fetchingData, setFetchingData] = useState(true);

    const [user, setUser] = useState<User>();
    useEffect(() => {
        const getUserByUsername = async (username: string) => {
            const response = await GetUserByUsername(username);
            if (response.success) {
                setUser(response.data);
            } else {
                editStatusToast({
                    title: "Error fetching profile",
                    status: "error",
                    isClosable: true,
                });
            }
            setFetchingData(false);
        };
        const getUserByAuth = async () => {
            const response = await GetUserByAuth();
            if (response.success) {
                setUser(response.data);
            } else {
                editStatusToast({
                    title: "Error fetching profile",
                    status: "error",
                    isClosable: true,
                });
            }
            setFetchingData(false);
        };

        if (usernameParam !== undefined) {
            getUserByUsername(usernameParam);
        } else {
            getUserByAuth();
        }
    }, [usernameParam]);

    const editStatusToast = useToast();
    const {
        isOpen: isEditPfpOpen,
        onOpen: onEditPfpOpen,
        onClose: onEditPfpClose,
    } = useDisclosure();
    const {
        isOpen: isEditUsernameOpen,
        onOpen: onEditUsernameOpen,
        onClose: onEditUsernameClose,
    } = useDisclosure();
    const {
        isOpen: isEditDescriptionOpen,
        onOpen: onEditDescriptionOpen,
        onClose: onEditDescriptionClose,
    } = useDisclosure();
    const updateUser = async (
        propertyName: "pfp" | "username" | "description",
        value: string
    ) => {
        onEditPfpClose();
        if (!user) {
            editStatusToast({
                title: "Error updating profile",
                status: "error",
                isClosable: true,
            });
            return;
        }

        const newUser: User = { ...user, [propertyName]: value };
        const response = await UpdateUser(newUser);
        if (response.success) {
            setUser(newUser);
            editStatusToast({
                title: "Profile updated",
                status: "success",
                isClosable: true,
            });
        } else {
            editStatusToast({
                title: "Error updating profile",
                description: response.error,
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <>
            {user !== undefined ? (
                <>
                    <Flex
                        direction={"row"}
                        alignContent={"center"}
                        width={"100%"}
                    >
                        <VStack alignItems={"center"} width={"100%"}>
                            {isMobile ? (
                                <VStack alignItems={"center"} width={"100%"}>
                                    <HStack>
                                        <Avatar
                                            borderWidth={0.5}
                                            size={isMobile ? "xl" : "2xl"}
                                            borderColor={"black"}
                                            src={user.pfp}
                                            name={user.username}
                                        />
                                        {!usernameParam && (
                                            <IconButton
                                                icon={<Icon as={IconEdit} />}
                                                aria-label={"Edit"}
                                                variant={"ghost"}
                                                onClick={() => {
                                                    onEditPfpOpen();
                                                }}
                                            />
                                        )}
                                    </HStack>
                                    <HStack>
                                        <Heading>{user.username}</Heading>
                                        {!usernameParam && (
                                            <IconButton
                                                icon={<Icon as={IconEdit} />}
                                                aria-label={"Edit"}
                                                variant={"ghost"}
                                                onClick={() => {
                                                    onEditUsernameOpen();
                                                }}
                                            />
                                        )}
                                    </HStack>
                                </VStack>
                            ) : (
                                <HStack>
                                    <Avatar
                                        borderWidth={0.5}
                                        size={isMobile ? "xl" : "2xl"}
                                        borderColor={"black"}
                                        src={user.pfp}
                                        name={user.username}
                                        marginRight={
                                            usernameParam ? 10 : undefined
                                        }
                                    />
                                    {!usernameParam && (
                                        <IconButton
                                            icon={<Icon as={IconEdit} />}
                                            aria-label={"Edit"}
                                            variant={"ghost"}
                                            marginRight={10}
                                            onClick={() => {
                                                onEditPfpOpen();
                                            }}
                                        />
                                    )}

                                    <Heading>{user.username}</Heading>
                                    {!usernameParam && (
                                        <IconButton
                                            icon={<Icon as={IconEdit} />}
                                            aria-label={"Edit"}
                                            variant={"ghost"}
                                            onClick={() => {
                                                onEditUsernameOpen();
                                            }}
                                        />
                                    )}
                                </HStack>
                            )}

                            <Card width={"100%"}>
                                <CardBody>
                                    <Flex direction={"row"}>
                                        <VStack alignItems={"start"}>
                                            <Text fontWeight={"bold"}>
                                                About me
                                            </Text>
                                            <Text overflowWrap={"anywhere"}>
                                                {user.description}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        {!usernameParam && (
                                            <IconButton
                                                icon={<Icon as={IconEdit} />}
                                                aria-label={"Edit"}
                                                variant={"ghost"}
                                                onClick={() => {
                                                    onEditDescriptionOpen();
                                                }}
                                            />
                                        )}
                                    </Flex>
                                </CardBody>
                            </Card>
                        </VStack>
                    </Flex>
                    <EditProfileText
                        isOpen={isEditPfpOpen}
                        onClose={onEditPfpClose}
                        onSave={(value) => updateUser("pfp", value)}
                        previousContent={user.pfp}
                        heading={"Change profile picture"}
                        placeholder={"Link to new profile picture"}
                    />
                    <EditProfileText
                        isOpen={isEditUsernameOpen}
                        onClose={onEditUsernameClose}
                        onSave={(value) => updateUser("username", value)}
                        previousContent={user.username}
                        heading={"Change username"}
                        placeholder={"New username"}
                    />
                    <EditProfileText
                        isOpen={isEditDescriptionOpen}
                        onClose={onEditDescriptionClose}
                        onSave={(value) => updateUser("description", value)}
                        previousContent={user.description}
                        heading={"Change description"}
                        placeholder={"New description"}
                    />
                </>
            ) : (
                <>
                    {!fetchingData && (
                        <Flex
                            direction={"column"}
                            alignItems={"center"}
                            width={"100%"}
                        >
                            <Heading>User not found</Heading>
                        </Flex>
                    )}
                </>
            )}
        </>
    );
};

export default Profile;
