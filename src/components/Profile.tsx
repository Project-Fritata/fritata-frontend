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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (username) {
            getUserByUsername();
        } else {
            getUserByAuth();
        }
    }, []);

    const getUserByUsername = async () => {
        const response = await fetch(
            "http://localhost:8010/api/v1/users/" + username
        );
        const data: User = await response.json();
        if (response.ok) {
            setUser(data);
        } else {
            setUser(undefined);
        }
    };
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

    return (
        <>
            {user ? (
                <Flex direction={"row"} alignContent={"center"} width={"100%"}>
                    <VStack alignItems={"center"} width={"100%"}>
                        <HStack>
                            <Avatar
                                borderWidth={0.5}
                                size={"2xl"}
                                borderColor={"black"}
                                src={user.pfp}
                            />
                            <VStack alignItems={"start"} width={"100%"}>
                                <Heading>{user.username}</Heading>
                                <Text>{}</Text>
                            </VStack>
                        </HStack>
                        <Card width={"100%"}>
                            <CardBody>
                                <Text fontWeight={"bold"}>About me</Text>
                                <Text>{user.description}</Text>
                            </CardBody>
                        </Card>
                    </VStack>
                </Flex>
            ) : (
                <Flex direction={"column"} alignItems={"center"} width={"100%"}>
                    <Heading>User not found</Heading>
                </Flex>
            )}
        </>
    );
};

export default Profile;
