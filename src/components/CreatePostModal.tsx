import { CreatePost } from "@/internal/api/PostsApi";
import { PostsPostRequest } from "@/internal/Models";
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

const CreatePostModal = ({
    isOpen,
    onClose,
    onPostSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    onPostSuccess: () => void;
}) => {
    const [content, setContent] = useState("");

    const postStatusToast = useToast();

    const onPost = async () => {
        const post: PostsPostRequest = {
            content,
            media: "",
        };
        const response = await CreatePost(post.content, post.media);
        if (response.success) {
            postStatusToast({
                title: "Post created",
                status: "success",
                isClosable: true,
            });
            onPostSuccess();
        } else {
            postStatusToast({
                title: "Error creating post",
                description: response.error,
                status: "error",
                isClosable: true,
            });
        }
        onClose();
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

export default CreatePostModal;
