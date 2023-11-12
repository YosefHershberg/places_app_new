import { Button, Heading, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import ToggleTheme from '../ToggleTheme'
import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'
import LogoutModal from '../modals/LogoutModal'

const Navbar = () => {
    const bg = useColorModeValue('gray.100', 'gray.800')
    const { loggedUser } = useAuth()
    const { isOpen: isLogoutModalOpen, onOpen: onLogoutModlOpen, onClose: onLogoutModleClose } = useDisclosure()

    return (
        <>
            <NavbarStyled bg={bg}>
                <div className='left-container'>
                    <Link to='/'>
                        <Heading>YourPlaces</Heading>
                    </Link>
                </div>
                <div className="right-container">
                    <Link to='/'>
                        <Button variant='outline'>All Users</Button>
                    </Link>

                    {!!loggedUser ?
                        <>
                            <Link to={`/${loggedUser.id}/places`}>
                                <Button variant='outline'>My Places</Button>
                            </Link>
                            <Link to='/places/new'>
                                <Button variant='outline'>
                                    Add Place
                                </Button>
                            </Link>
                            <Button onClick={onLogoutModlOpen}>Sign out</Button>
                        </> :
                        <Link to='/auth/login'>
                            <Button variant='outline'>Authenticate</Button>
                        </Link>
                    }
                    <ToggleTheme />
                </div>
            </NavbarStyled>
            <LogoutModal isOpen={isLogoutModalOpen} onClose={onLogoutModleClose} />
        </>
    )
}

export default Navbar

const NavbarStyled = styled(Box)`
    min-height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    .right-container {
        display: flex;
        gap: 1rem;
    }
`