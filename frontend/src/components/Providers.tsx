import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from '../pages/ErrorPage';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '@/lib/theme';
import AuthContextProvider from '@/context/AuthContextProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1
        },
    },
})

const Providers = ({ children }: { children: React.ReactNode }) => {

    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <ErrorBoundary FallbackComponent={ErrorPage}>
                    <AuthContextProvider>
                        <QueryClientProvider client={queryClient}>
                            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                            {children}
                        </QueryClientProvider>
                    </AuthContextProvider>
                </ErrorBoundary>
            </ChakraProvider>
        </BrowserRouter>
    )
}

export default Providers