import { Place as PlaceType } from '@/lib/Types'
import { Card, Heading, Image, Text, Divider, Button, useDisclosure } from '@chakra-ui/react'
import styled from 'styled-components'
import MapModal from '../modals/MapModal'
import useAuth from '@/utils/hooks/useAuth'
import DeletePlaceModal from '../modals/DeletePlaceModal'
import { useCallback, useEffect } from 'react'
import useOptDeletePlace from '@/utils/hooks/useOptDeletePlace'
import { Link } from 'react-router-dom'
const ASSET_URL = import.meta.env.VITE_ASSET_URL;

interface PlaceProps {
    place: PlaceType,
}

const Place = ({ place }: PlaceProps) => {
    const { isOpen: isMapModalOpen, onOpen: onOpenMapModal, onClose: onCloseMapModal } = useDisclosure()
    const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure()
    const { loggedUser } = useAuth()
    const deletePlaceMutation = useOptDeletePlace()

    const handleDeletePlace = useCallback(() => {
        deletePlaceMutation.mutate(place.id)
        onCloseDeleteModal()
    }, [])

    return (
        <>
            <PlaceStyled boxShadow='lg'>
                <Image
                    src={place.image}
                    alt={place.title}
                    borderRadius='lg'
                    objectFit='cover'
                    height='23rem'
                    width='100%'
                />
                <Heading size='lg' margin='.7rem'>{place.title}</Heading>
                <Heading size='md' marginBottom='.7rem'>{place.address}</Heading>
                <Text className='description'>{place.description}</Text>
                <Divider width='95%' />
                <div className="btn-container">
                    <Button colorScheme='blue' onClick={onOpenMapModal}>View on Map</Button>
                    {loggedUser?.id === place.creator &&
                        <>
                            <Link to='/places/update' state={place}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={onOpenDeleteModal} colorScheme='red'>Delete</Button>
                        </>
                    }
                </div>
            </PlaceStyled>
            <DeletePlaceModal
                isOpen={isDeleteModalOpen}
                onClose={onCloseDeleteModal}
                onDelete={handleDeletePlace}
            />
            <MapModal isOpen={isMapModalOpen} onClose={onCloseMapModal} place={place} />
        </>
    )
}

export default Place

export const PlaceStyled = styled(Card)`
    width: 100%;
    margin: .5rem;
    height: 37rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .description {
        padding: 0 1rem .5rem;
        text-align: center;
    }

    .btn-container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }
`