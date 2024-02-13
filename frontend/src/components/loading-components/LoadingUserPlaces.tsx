import { PlaceStyled } from '@/components/places/Place'
import { UserPlacesStyled } from '@/components/users/UserPlaces'
import { Skeleton, Divider } from '@chakra-ui/react'

const LoadingUserPlaces = () => {
    return (
        <UserPlacesStyled>
            <div className="inner-container">
                <PlaceStyled>
                    <Skeleton
                        borderRadius='7px'
                        height='23rem'
                        width='100%'
                    />
                    <Skeleton height='2rem' width='18rem' size='lg' margin='.7rem' />
                    <Skeleton height='2rem' width='6rem' marginBottom='.7rem' />
                    <Skeleton height='1.7rem' width='16rem' marginBottom='.7rem' />
                    <Divider width='95%' />
                    <div className="btn-container">
                        <Skeleton height='2.5rem' borderRadius='7px' width='8rem' />
                    </div>
                </PlaceStyled>
            </div>
        </UserPlacesStyled >
    )
}

export default LoadingUserPlaces