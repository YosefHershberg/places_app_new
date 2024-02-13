import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserLogin } from '@/lib/models/userSchema'
import useHttpClient from './useHttpClient'
import { UserRegister } from '@/lib/models/userSchema'
import useAuth from '@/utils/hooks/useAuth'
import { isResponseStatusSuccess } from '../helperFunctions'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

const useOnboarding = (isLogin: boolean) => {
    const navigate = useNavigate();
    const { logUserIn } = useAuth();

    const emptyForm = useMemo(() => {
        return isLogin ?
            {
                email: '',
                password: ''
            } : {
                name: '',
                email: '',
                image: null,
                password: '',
            };
    }, [isLogin]);

    const [showPassowrd, setShowPassowrd] = useState<boolean>(false);
    const [formData, setFromData] = useState<UserLogin | UserRegister>(emptyForm);
    const [bluredInputs, setBluredInputs] = useState<any>(isLogin ? {
        username: false,
        password: false,
    } : {
        name: false,
        username: false,
        password: false,
    });

    const { data, error, isLoading, triggerHttpReq, responseStatus } = useHttpClient({
        API_URL: isLogin ? `${SERVER_URL}/users/login/` : `${SERVER_URL}/users/signup`,
        httpMethod: 'POST',
        // body: isLogin ? formData : registerFrom
        body: formData
    });

    useEffect(() => {
        if (error) {
            // setFromData(emptyForm)
            setBluredInputs(isLogin ? {
                username: false,
                password: false,
            } : {
                name: false,
                username: false,
                password: false,
            });
        };
    }, [error]);

    useEffect(() => {
        if (responseStatus && isResponseStatusSuccess(responseStatus)) {
            logUserIn(data.user);
            navigate('/', { replace: true });
        };
    }, [responseStatus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        setBluredInputs({
            ...bluredInputs,
            [e.target.name]: true
        });
    }, [bluredInputs]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        setBluredInputs({
            ...bluredInputs,
            [e.target.name]: false
        });
    }, [bluredInputs]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        triggerHttpReq();
    }, [formData]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    }, [formData]);

    const handleFileChange = useCallback((file: string) => {
        setFromData({ ...formData, image: file });
    }, [formData]);

    const toggleShowPassword = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setShowPassowrd(prev => !prev);
    }, []);

    return {
        toggleShowPassword,
        handleChange,
        handleSubmit,
        showPassowrd,
        formData,
        response: {
            data, error, isLoading
        },
        bluredInputs,
        handleBlur,
        handleFocus,
        handleFileChange
    }
}

export default useOnboarding;