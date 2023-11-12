import { useContext } from 'react'
import { AuthContext, AuthContextType } from '@/context/AuthContextProvider'

const useAuth = () => {
    const { loggedUser, logUserIn, signOut } = useContext<AuthContextType>(AuthContext);

    return { loggedUser, logUserIn, signOut };
}

export default useAuth