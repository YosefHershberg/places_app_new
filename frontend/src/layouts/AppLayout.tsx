import Navbar from "@/components/nav/Navbar"
import { Box, useColorModeValue } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const AppLayout = () => {
    const bg = useColorModeValue('#F5FFFA', 'gray.800')

    return (
        <AppLayoutStyled bg={bg}>
            <Navbar />
            <Outlet />
        </AppLayoutStyled>
    )
}

export default AppLayout

const AppLayoutStyled = styled(Box)`
    height: 100vh;
    width: 100vw;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    /* display: flex;
    flex-direction: column; */
`