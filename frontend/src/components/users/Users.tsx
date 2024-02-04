import UserCard from "@/components/users/UserCard"
import { Box, Button, Heading } from "@chakra-ui/react"
import styled from "styled-components"
import { useQuery } from "react-query"
import { getUsers } from "@/lib/api"
import LoadingUsers from "@/components/loading-components/LoadingUsers"
import { v4 as uuidv4 } from 'uuid';
import ErrorPage from "@/pages/ErrorPage"
import { Link } from "react-router-dom"

const Users = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    if (isLoading) return (<LoadingUsers />)

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
        <UsersStyled>
            <div className="card-container">
                {data.users.length === 0 &&
                    <div className='no-users-yet'>
                        <Heading>There are no users yet</Heading>
                        <Link to='/auth/register'>
                            <Button width='7rem' size='lg'>Sign up</Button>
                        </Link>
                    </div>
                }
                {data.users.map((user: any) => (
                    <UserCard user={user} key={uuidv4()} />
                ))}
            </div>
        </UsersStyled>
    )
}

export default Users

export const UsersStyled = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: center;
 
    .card-container {
        list-style: none;
        margin: 0 auto;
        margin-top: 1rem;
        padding: 0;
        width: 90%;
        max-width: 50rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .no-users-yet {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }
    }
`