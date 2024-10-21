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
} from "@chakra-ui/react";
import { useState } from "react";

const EditProfileText = ({
    isOpen,
    onClose,
    onSave,
    heading,
    previousContent,
    placeholder,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (value: string) => void;
    heading: string;
    previousContent: string;
    placeholder: string;
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
                        onChange={(e) => setContent(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => onSave(content)}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileText;
