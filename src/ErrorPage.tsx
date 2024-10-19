import { Heading, VStack, Text } from "@chakra-ui/react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    let errorMessage;
    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    return (
        <VStack>
            <Heading>Error</Heading>
            <Heading size={"2xl"}>
                Sorry, an unexpected error has occurred
            </Heading>
            <Text>{errorMessage}</Text>
        </VStack>
    );
};

export default ErrorPage;
