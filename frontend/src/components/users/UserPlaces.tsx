import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getPlacesByUserId } from '@/lib/api'
import styled from 'styled-components'
import { Box, Heading } from '@chakra-ui/react'
import Place from '@/components/places/Place'
import LoadingUserPlaces from '@/components/loading-components/LoadingUserPlaces'
import { Place as PlaceType } from '@/lib/Types'
import ErrorPage from '@/pages/ErrorPage'
import { v4 as uuidv4 } from 'uuid'

const UserPlaces = () => {
    const { userId } = useParams()

    const { data: places, isLoading, error } = useQuery({
        queryKey: [`${userId}`],
        queryFn: () => getPlacesByUserId(userId),
    })

    if (isLoading) return <LoadingUserPlaces />

    if (error) return (
        <ErrorPage
            resetFunction={() => { }}
            //@ts-expect-error
            status={error.response?.status || 500}
            //@ts-expect-error
            message={error.response?.data?.message || error.message}
            isComponent={true}
        />
    )

    return (
        <UserPlacesStyled>
            <div className="inner-container">
                {places.length === 0 &&
                    <Heading
                        size='lg'
                        style={{ textAlign: 'center' }}
                    >
                        This user has no places yet...
                    </Heading>
                }
                {places.map((place: PlaceType) => (
                    <Place place={place} key={uuidv4()} />
                ))}
            </div>
        </UserPlacesStyled>
    )
}

export default UserPlaces

export const UserPlacesStyled = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 1rem;
`