import { UsernameCheckValidity } from "@/internal/EmailUsernameCheck";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const EditProfileText = ({
    isOpen,
    onClose,
    onSave,
    heading,
    previousContent,
    placeholder,
    isUsername,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (value: string) => void;
    heading: string;
    previousContent: string;
    placeholder: string;
    isUsername?: boolean;
}) => {
    const [content, setContent] = useState(previousContent);

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{heading}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea
                        placeholder={placeholder}
                        value={content}
                        onChange={(e) => {
                            if (isUsername && !UsernameCheckValidity(e.target.value)) {
                                return
                            }
                            setContent(e.target.value);
                        }}
                    />
                    {isUsername && (
                        <Text>
                            Usernames can only contain english letters, numbers, and the following characters: @ - _ .
                        </Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => onSave(content)}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileText;
