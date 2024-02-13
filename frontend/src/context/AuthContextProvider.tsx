import { User } from '@/lib/Types'
import axiosClient from '@/lib/axiosClient'
import { createContext, useState, useCallback, useMemo, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
        localStorage.setItem('places_user', JSON.stringify(user));
        localStorage.setItem('access_token', JSON.stringify(token));
    }, [])

    const signOut = useCallback(() => {
        setLoggedUser(null);
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

        return () => {
            axiosClient.interceptors.request.eject(interceptorRequests);
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