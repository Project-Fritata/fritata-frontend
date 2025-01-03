import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import NotFoundPage from "./NotFoundPage";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PostFeed from "./components/PostFeed";
import Profile from "./components/Profile";

createRoot(document.getElementById("root")!).render(
    <ChakraProvider>
        <HashRouter>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<Home />}>
                    <Route index element={<PostFeed />} />
                    <Route path="profile" element={<Profile />}>
                        <Route path=":username" element={<Profile />} />
                    </Route>
                </Route>
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </HashRouter>
    </ChakraProvider>
);
