import useOnboarding from "@/utils/hooks/useOnboarding"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Checkbox, Divider, Heading, Input } from '@chakra-ui/react'
import { UserLoginSchema, emailSchema, passwordSchema } from "@/lib/models/userSchema"
import InputContainer from "@/styles/InputContainer"
import styled from 'styled-components'
import { useEffect } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    const {
        toggleShowPassword,
        handleChange,
        handleSubmit,
        showPassowrd,
        formData,
        response,
        bluredInputs,
        handleBlur,
        handleFocus,
    } = useOnboarding(true)

    useEffect(() => {
        response.error && console.log(response.error, response);
    }, [response]);

    return (
        <LoginStyled>
            <Box
                borderWidth='1px'
                borderRadius='lg'
                className="login-form-container"
            >
                <Heading size='lg' className="main-header">Login</Heading>
                <Divider marginY={'1rem'} />
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Heading size='md' className="input-header">
                            Email
                        </Heading>
                        <Input
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={formData.email}
                            name="email"
                            placeholder="Enter Email Address"
                        />
                        {bluredInputs.email && !(emailSchema.safeParse(formData?.email).success) &&
                            <span className="error-text">Invalid Email Adress</span>
                        }
                    </InputContainer>
                    <InputContainer>
                        <Heading size='md' className="input-header">
                            Password
                        </Heading>
                        <Input
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={formData.password}
                            name="password"
                            type={showPassowrd ? 'text' : 'password'}
                            placeholder="Enter Password"
                        />
                        {bluredInputs.password && !(passwordSchema.safeParse(formData?.password).success) &&
                            <span className="error-text">Invalid Password! Enter at least 5 charecters</span>
                        }
                    </InputContainer>

                    <Checkbox onChange={toggleShowPassword} className="show-password-chebox">Show Password</Checkbox>

                    <Button
                        isLoading={response.isLoading}
                        isDisabled={!UserLoginSchema.safeParse(formData).success}
                        type='submit'
                        colorScheme="blue"
                        className="submit-btn"
                    >
                        Submit
                    </Button>
                </form>
                {response.error &&
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>{response.error.response?.status || '500!'}</AlertTitle>
                        {/* @ts-expect-error */}
                        <AlertDescription>{response.error.response?.data?.message || response.error.message}</AlertDescription>
                    </Alert>
                }
            </Box>
            <span>Don't have a user yet? <Link to='/auth/register'>Register</Link></span>
        </LoginStyled>
    )
}

export default Login

export const LoginStyled = styled(Box)`
    /* min-height: 100%; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    
    .login-form-container {
        padding: 1rem;
        margin: 1rem;
        width: 25rem;

        .main-header {
            display: flex;
            justify-content: center;
        }

        .show-password-chebox {
            margin-top: 1rem;
            padding-left: 1rem;
            width: 100%;
        }

        .submit-btn {
            margin: 1rem 0;
            width: 100%;
        }
    }
`