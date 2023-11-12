import { Avatar, Card, CardBody, Text, Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import styled from "styled-components"

interface UserCardProps {
    user: any
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <UserCradStyled>
            <Link to={`/${user.id}/places`}>
                <CardBody className='card-body'>
                    <Avatar
                        name={user.name}
                        src={user.image}
                        className="avatar"
                        size='lg'
                    />
                    <div className="right-container">
                        <Heading size='md'>{user.name}</Heading>
                        <Text>{`${user.places.length} Place${user.places.length === 1 ? '' : 's'}`}</Text>
                    </div>
                </CardBody>
            </Link>
        </UserCradStyled>
    )
}

export default UserCard

export const UserCradStyled = styled(Card)`
    width: 20rem;
    margin: .5rem;
    height: 7rem;

    .card-body {
        display: flex;
        align-items: center;

        .avatar {
            margin-right: 1rem;
            /* height: 100%; */
        }

        .right-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
        } 
    }

`