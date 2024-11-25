import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import NotFoundPage from "./NotFoundPage";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PostFeed from "./components/PostFeed";
import Profile from "./components/Profile";

createRoot(document.getElementById("root")!).render(
    <ChakraProvider>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/fritata-frontend" element={<Home />}>
                    <Route index element={<PostFeed />} />
                    <Route path="profile" element={<Profile />}>
                        <Route path=":username" element={<Profile />} />
                    </Route>
                </Route>
                <Route path="/fritata-frontend/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
);
