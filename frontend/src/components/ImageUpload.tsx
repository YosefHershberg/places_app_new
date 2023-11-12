import React, { useState, useEffect, useRef } from 'react';
import { Button, Center, Image, Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

interface ImageUploadProps {
    imageWidth?: string,
    id?: string,
    onInput: (file: File) => void,
}

function ImageUpload({ id, onInput, imageWidth }: ImageUploadProps) {
    // const [file, setFile] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);
    const filePickerRef = useRef<HTMLInputElement | null>(null);

    function pickImageHandler() {
        filePickerRef.current?.click();
    }

    async function pickedHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            let formatedFile: any;
            try {
                setIsLoading(true)
                formatedFile = await convertToBase64(pickedFile)
                setPreviewUrl(formatedFile)
                onInput(formatedFile)
                // onInput(event.target.files[0])
            } catch (error) {
                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <ImageUploadStyled width={imageWidth}>
            <input
                ref={filePickerRef}
                type="file"
                id={id}
                name='image'
                style={{ display: 'none' }}
                accept='.jpg, .png, .jpeg'
                onChange={pickedHandler}
            />
            <div className='image-upload'>
                {isLoading ?
                    <Center height='10rem'>
                        <Spinner />
                    </Center>
                    : previewUrl ?
                        //@ts-expect-error
                        <Image src={previewUrl} alt="Preview" className='image' />
                        : <p className='pick-image-text'>Please pick an image</p>

                }
                <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
        </ImageUploadStyled>
    )
}

export default ImageUpload

function convertToBase64(file: File) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

interface ImageUploadStyled {
    width: string | undefined
}

const ImageUploadStyled = styled.div<ImageUploadStyled>`
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    .image-upload {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .pick-image-text {
            margin-bottom: .5rem;
        }

        .image {
            border-radius: 7px;
            margin-bottom: 1rem;
            aspect-ratio: 1/1;
            width: ${({ width }) => width || '10rem'};
        }
    }

`