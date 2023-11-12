import { NewPlaceStyeld } from "./NewPlace"
import InputContainer from "@/styles/InputContainer"
import { Card, Heading, Input, Button } from "@chakra-ui/react"
import useUpdatePlace from "@/utils/hooks/useUpdatePlace"
import { updatePlaceSchema } from "@/lib/models/placeSchema"

const UpdatePlace = () => {
    const {
        handleBlur,
        handleChange,
        handleFocus,
        handleSubmit,
        placeData,
        isTitleValid,
        isDescriptionValid,
    } = useUpdatePlace()

    return (
        <NewPlaceStyeld>
            <Card className="inner-container">
                <Heading className="header" size='lg'>Update Place</Heading>
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
                            value={placeData.title}
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
                            value={placeData.description}
                            name="description"
                            placeholder="Describe you new place"
                        />
                        {isDescriptionValid &&
                            <span className="error-text">Must contain 8 characters</span>
                        }
                    </InputContainer>

                    <div className="btn-container">
                        <Button
                            colorScheme="blue"
                            type="submit"
                            size='lg'
                            isDisabled={!updatePlaceSchema.safeParse(placeData).success}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Card>
        </NewPlaceStyeld>
    )
}

export default UpdatePlace