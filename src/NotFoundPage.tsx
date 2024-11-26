import { Heading, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const NotFoundPage = () => {
    return (
        <VStack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
            <Heading>Not Found: This page does not exist</Heading>
            <ChakraLink
                as={ReactRouterLink}
                to={`/`}
            >
                Go back to homepage
            </ChakraLink>
        </VStack>
    );
};

export default NotFoundPage;
