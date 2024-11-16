import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import {
    Box,
    Center,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";

const Auth = () => {
    return (
        <Center h={"100vh"}>
            <Box
                p={8}
                maxWidth="500px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Tabs variant={"enclosed"} isFitted>
                    <TabList>
                        <Tab>Login</Tab>
                        <Tab>Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LoginForm />
                        </TabPanel>
                        <TabPanel>
                            <RegisterForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Center>
    );
};

export default Auth;
