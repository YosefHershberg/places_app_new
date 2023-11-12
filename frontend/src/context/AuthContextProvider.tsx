import { User } from '@/lib/Types'
import axiosClient from '@/lib/axiosClient'
import { createContext, useState, useCallback, useMemo, useLayoutEffect, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AxiosError, AxiosResponse } from 'axios'

export interface AuthContextType {
    loggedUser: User | null,
    logUserIn: (user: User, token: string) => void,
    signOut: () => void
};

export const AuthContext = createContext<AuthContextType>({
    loggedUser: null,
    logUserIn: () => undefined,
    signOut: () => undefined
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const userFromLS = useMemo(() => localStorage.getItem('places_user'), []);
    const [loggedUser, setLoggedUser] = useState<User | null>(userFromLS ? JSON.parse(userFromLS) : null);
    const navigate = useNavigate();

    const logUserIn = useCallback((user: User, token: string) => {
        setLoggedUser(user);
        // Cookies.set('access_token', token);
        localStorage.setItem('places_user', JSON.stringify(user));
        localStorage.setItem('access_token', token);
    }, [])

    // useEffect(() => {
    //     console.log(Cookies.get('access_token'));
    // }, []);

    const signOut = useCallback(() => {
        setLoggedUser(null);
        // Cookies.remove('access_token');
        localStorage.removeItem('places_user');
        localStorage.removeItem('access_token');
        navigate('/', { replace: true });
    }, [])

    useLayoutEffect(() => {
        const interceptorRequests = axiosClient.interceptors.request.use(
            (req) => {
                const accessToken = localStorage.getItem('access_token');
                if (accessToken) {
                    req.headers.Authorization = `Bearer ${accessToken}`;
                }
                return req;
            },
            (error: Error) => error,
        );

        // const interceptorResponses = axiosClient.interceptors.response.use(
        //     (res: AxiosResponse) => res,
        //     (error: AxiosError) => {
        //         // console.log(error);
        //         //@ts-expect-error
        //         if (error.response.status === 401 && error.response.data.message === 'Authentication failed') {
        //             console.log('yay');
        //             signOut();
        //         };
        //         return error;
        //     },
        // );

        return () => {
            axiosClient.interceptors.request.eject(interceptorRequests);
            // axiosClient.interceptors.response.eject(interceptorResponses);
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            loggedUser,
            logUserIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;