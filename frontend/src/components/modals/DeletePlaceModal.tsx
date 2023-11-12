import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Heading,
} from '@chakra-ui/react'

interface DeletePlaceModal {
  isOpen: boolean,
  onClose: () => void,
  onDelete: () => void
}

const DeletePlaceModal = ({ isOpen, onClose, onDelete }: DeletePlaceModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody margin='1rem' textAlign='center'>
          <Heading size='md'>Are you sure you want to Delete this place?</Heading>
        </ModalBody>

        <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' onClick={onDelete}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeletePlaceModal