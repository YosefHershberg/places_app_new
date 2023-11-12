import { Place } from '@/lib/Types'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import GoogleMap from '../GoogleMap'

interface MapModalProps {
    isOpen: boolean,
    place: Place
    onClose: () => void
}

const MapModal = ({ isOpen, onClose, place }: MapModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
            <ModalOverlay />
            <ModalContent className='content' margin='1rem'>
                <ModalHeader>{place.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div style={{ height: '20rem', width: '100%' }}>
                        <GoogleMap location={place.location} zoom={15} />
                    </div>

                    <ModalFooter style={{ display: 'flex', justifyContent: 'center' }} >
                        <Button colorScheme='blue' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MapModal
