import useAuth from '@/utils/hooks/useAuth'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Heading,
} from '@chakra-ui/react'
import { useCallback } from 'react'

interface LogoutModal {
    isOpen: boolean,
    onClose: () => void
}

const LogoutModal = ({ isOpen, onClose }: LogoutModal) => {
    const { signOut } = useAuth()
    
    const handleLogout = useCallback(() => {
        signOut()
        onClose()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalBody margin='1rem' textAlign='center'>
                    <Heading size='md'>Are you sure you want to log out?</Heading>
                </ModalBody>

                <ModalFooter style={{ display:'flex', justifyContent: 'center' }}>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='blue' onClick={handleLogout}>Log Out</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default LogoutModal