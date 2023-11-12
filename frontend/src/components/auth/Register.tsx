import useOnboarding from "@/utils/hooks/useOnboarding"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Checkbox, Divider, Heading, Input } from '@chakra-ui/react'
import { UserRegisterSchema, emailSchema, passwordSchema, nameSchema } from "@/lib/models/userSchema"
import { LoginStyled } from "./Login"
import { Link } from "react-router-dom"
import ImageUpload from "../ImageUpload"
import InputContainer from "@/styles/InputContainer"

const Register = () => {
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
        handleFileChange
    } = useOnboarding(false)

    return (
        <LoginStyled>
            <Box
                borderWidth='1px'
                borderRadius='lg'
                className="login-form-container"
            >
                <Heading size='lg' className="main-header">Register</Heading>
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
                            Name
                        </Heading>
                        <Input
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            //@ts-expect-error
                            value={formData.name}
                            name="name"
                            placeholder="Enter Name"
                        />
                        {/* @ts-expect-error */}
                        {bluredInputs.name && !(nameSchema.safeParse(formData?.name).success) &&
                            <span className="error-text">Must ba at least 3 characters</span>
                        }
                    </InputContainer>
                    <InputContainer>
                        <Heading size='md' className="input-header">
                            Profile Image
                        </Heading>
                        <ImageUpload onInput={handleFileChange}/>
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
                        isDisabled={!UserRegisterSchema.safeParse(formData).success}
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
            <span>Already have an account? <Link to='/auth/login'>Login</Link></span>
        </LoginStyled>
    )
}

export default Register