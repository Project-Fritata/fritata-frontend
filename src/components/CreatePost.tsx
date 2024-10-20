import { PostsPostRequest } from "@/internal/ReqRes";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const CreatePost = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [content, setContent] = useState("");

    const postStatusToast = useToast();

    const onPost = async () => {
        const post: PostsPostRequest = {
            content,
            media: "",
        };
        try {
            const response = await fetch("http://localhost:8020/api/v1/posts", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                postStatusToast({
                    title: "Post created",
                    status: "success",
                    isClosable: true,
                });
            } else {
                postStatusToast({
                    title: "Error creating post",
                    description: data.message,
                    status: "error",
                    isClosable: true,
                });
            }
        } catch (error: any) {
            postStatusToast({
                title: "Error creating post",
                description: error.message,
                status: "error",
                isClosable: true,
            });
        } finally {
            onClose();
        }
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea
                        placeholder="Write the post content here"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onPost}>Post</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreatePost;
