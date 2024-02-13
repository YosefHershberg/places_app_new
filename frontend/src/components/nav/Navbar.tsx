import { Button, Heading, IconButton, MenuList, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import styled from "styled-components";
import { Box, Menu, MenuButton, MenuItem } from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'
import LogoutModal from '../modals/LogoutModal'
import { useEffect, useState } from 'react';
import { AddIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaPlaceOfWorship, FaUsers } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import breakpoints from '@/lib/breakingpoints';

const Navbar = () => {
    const bg = useColorModeValue('gray.100', 'gray.800')
    const { loggedUser } = useAuth()
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isLogoutModalOpen, onOpen: onLogoutModlOpen, onClose: onLogoutModleClose } = useDisclosure()

    const [isMobile, setIsMobile] = useState(!(window.innerWidth <= 768));

    const handleResize = () => {
        setIsMobile(!(window.innerWidth <= 768));
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <NavbarStyled bg={bg}>
                <div className='left-container'>
                    <Link to='/'>
                        <Heading>YourPlaces</Heading>
                    </Link>
                </div>
                {isMobile ?
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
                                    <Button variant='outline'>Add Place</Button>
                                </Link>
                                <Button onClick={onLogoutModlOpen}>Sign out</Button>
                            </> :
                            <Link to='/auth/login'>
                                <Button variant='outline'>Authenticate</Button>
                            </Link>
                        }
                        <Button
                            onClick={() => toggleColorMode()}
                        >
                            {colorMode === "dark" ? (
                                <SunIcon />
                            ) : (
                                <MoonIcon />
                            )}
                        </Button>
                    </div> :
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                            <Link to='/'>
                                <MenuItem icon={<FaUsers />}>
                                    All Users
                                </MenuItem>
                            </Link>
                            {!!loggedUser ?
                                <>
                                    <Link to={`/${loggedUser.id}/places`}>
                                        <MenuItem icon={<FaPlaceOfWorship />}>My Places</MenuItem>
                                    </Link>
                                    <Link to='/places/new'>
                                        <MenuItem icon={<AddIcon />}>
                                            Add Place
                                        </MenuItem>
                                    </Link>
                                    <MenuItem icon={<FaSignOutAlt />} onClick={onLogoutModlOpen}>Sign out</MenuItem>
                                </> :
                                <Link to='/auth/login'>
                                    <MenuItem icon={<IoIosLogIn />}>Authenticate</MenuItem>                </Link>
                            }
                            <MenuItem onClick={() => toggleColorMode()} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}>
                                {colorMode === "dark" ? 'Light mode' : 'Dark mode'}
                            </MenuItem>
                        </MenuList>
                    </Menu>

                }
            </NavbarStyled>
            <LogoutModal isOpen={isLogoutModalOpen} onClose={onLogoutModleClose} />
        </>
    )
}

export default Navbar

const NavbarStyled = styled(Box)`
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    ${breakpoints.mobile} {
        max-height: 3.5rem;
    }

    .right-container {
        display: flex;
        gap: 1rem;
    }
`