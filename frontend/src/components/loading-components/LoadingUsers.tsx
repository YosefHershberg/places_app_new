import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText, CardBody } from '@chakra-ui/react'
import { UsersStyled } from '@/components/users/Users'
import { UserCradStyled } from '../users/UserCard'

const LoadingUsers = () => {
    return (
        <UsersStyled>
            <div className="card-container">
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <UserCradStyled key={num}>
                        <CardBody className='card-body'>
                            <SkeletonCircle size='55' className="avatar" />
                            <div className="right-container">
                                <Skeleton height='20px' width='10rem' />
                                <Skeleton height='20px' width='7rem' />
                            </div>
                        </CardBody>
                    </UserCradStyled>
                ))}
            </div>
        </UsersStyled>
    )
}

export default LoadingUsers