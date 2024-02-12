import { Place as PlaceType } from '@/lib/Types'
import { Card, Heading, Image, Text, Divider, Button, useDisclosure } from '@chakra-ui/react'
import styled from 'styled-components'
import MapModal from '../modals/MapModal'
import useAuth from '@/utils/hooks/useAuth'
import DeletePlaceModal from '../modals/DeletePlaceModal'
import { useCallback } from 'react'
import useOptDeletePlace from '@/utils/hooks/useOptDeletePlace'
import { Link } from 'react-router-dom'
import breakpoints from '@/lib/breakingpoints'

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
                <img
                    src={place.image}
                    alt={place.title}
                    className='place-img'
                />
                <Heading size='lg' margin='.7rem'>{place.title}</Heading>
                <Heading size='md' marginBottom='.7rem'>{place.address}</Heading>
                <Text className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, sed voluptas explicabo recusandae ipsam mollitia exercitationem perspiciatis. Dolorum, perferendis provident.</Text>
                <Divider width='95%' />
                <div className="btn-container">
                    <Button
                        colorScheme='blue'
                        onClick={onOpenMapModal}
                        className='options-btn'
                    >
                        View on Map
                    </Button>
                    {loggedUser?.id === place.creator &&
                        <>
                            <Link to='/places/update' state={place}>
                                <Button className='options-btn'>Edit</Button>
                            </Link>
                            <Button
                                onClick={onOpenDeleteModal}
                                colorScheme='red'
                                className='options-btn'
                            >
                                Delete
                            </Button>
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
    /* width: 40rem; */
    width: clamp(17rem, 90vw, 40rem);
    margin: .5rem;
    height: 33rem;
    max-height: 40rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    ${breakpoints.mobile} {
        height: 23rem;
    }

    .place-img {
        border-radius: inherit;
        height: 23rem;
        width: 100%;

        ${breakpoints.mobile} {
            height: 10rem;
        }

        object-fit: cover;
    }

    .description {
        padding: 0 1rem .5rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    .btn-container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
        min-height: 3.2rem;
        padding: 0 .5rem;

        .options-btn {
            ${breakpoints.mobile} {
                height: 2rem;
            }
        }
    }
`