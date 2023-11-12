import InputContainer from "@/styles/InputContainer"
import { Alert, AlertDescription, AlertIcon, AlertTitle , Button, Card, Heading, Input } from "@chakra-ui/react"
import styled from "styled-components"
import useNewPlace from "@/utils/hooks/useNewPlace"
import ImageUpload from "../ImageUpload"
import { placeSchema } from "@/lib/models/placeSchema"

const NewPlace = () => {
    const { handleBlur,
        handleChange,
        handleFocus,
        handleSubmit,
        newPlaceData,
        isTitleValid,
        isDescriptionValid,
        isAddressValid,
        handleFileChange,
        response
    } = useNewPlace()

    return (
        <NewPlaceStyeld>
            <Card className="inner-container">
                <Heading className="header" size='lg'>Add a New Place</Heading>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Heading size='md' className="input-header">
                            Title
                        </Heading>
                        <Input
                            isInvalid={isTitleValid}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={newPlaceData.title}
                            name="title"
                            placeholder="Enter Title"
                        />
                        {isTitleValid &&
                            <span className="error-text">Must contain 3 characters</span>
                        }
                    </InputContainer>
                    <InputContainer>
                        <Heading size='md' className="input-header">
                            Description
                        </Heading>
                        <Input
                            isInvalid={isDescriptionValid}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={newPlaceData.description}
                            name="description"
                            placeholder="Describe you new place"
                        />
                        {isDescriptionValid &&
                            <span className="error-text">Must contain 8 characters</span>
                        }
                    </InputContainer>
                    <InputContainer>
                        <Heading size='md' className="input-header">
                            Address
                        </Heading>
                        <Input
                            isInvalid={isAddressValid}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={newPlaceData.address}
                            name="address"
                            placeholder="Enter address"
                        />
                        {isAddressValid &&
                            <span className="error-text">Must contain 8 characters</span>
                        }
                    </InputContainer>
                    <ImageUpload
                        onInput={handleFileChange}
                    />
                    <div className="btn-container">
                        <Button
                            colorScheme="blue"
                            type="submit"
                            size='lg'
                            isLoading={response.isLoading}
                            isDisabled={!placeSchema.safeParse(newPlaceData).success}    
                        >
                            Submit
                        </Button>
                    </div>
                </form>
                {response.error &&
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>{response.error.response?.status || '500!'}</AlertTitle>
                        {/* @ts-expect-error */}
                        <AlertDescription>{response.error.response?.data?.message || response.error.message}</AlertDescription>
                    </Alert>
                }
            </Card>
        </NewPlaceStyeld>
    )
}

export default NewPlace

export const NewPlaceStyeld = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;

    .inner-container {
        margin: 1rem;
        width: 40rem;
        /* height: 30rem; */
        padding: 1rem;

        .header {
            margin-top: 1rem;
            text-align: center;
        }

        .btn-container {
            height: 3rem;
            width: 100%;
            margin: 1rem 0;
            display: flex;
            justify-content: center;
        }
    }
`