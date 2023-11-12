import React from 'react'
import styled from 'styled-components';
import { Button } from '@chakra-ui/react';
import errorPic from '@/assets/ErrorPic.png';
import { FallbackProps } from 'react-error-boundary'

const ErrorPage = ({ resetErrorBoundary, resetFunction, status, message, isComponent }: React.ComponentType<FallbackProps> | any) => { //TODO: type this

    return (
        <ErrorPageStyled isComponent={isComponent}>
            <h1 className='message'>{message || 'Something went terribly wrong!'}</h1>
            <div className="image-container">
                <h1 className='status'>{status}</h1>
                <img className='error-image' src={errorPic} alt="" />
            </div>
            {(resetFunction || resetErrorBoundary) &&
                <Button className='reset-btn' onClick={resetFunction || resetErrorBoundary}>Try again</Button>
            }
        </ErrorPageStyled>
    )
}

export default ErrorPage

interface ErrorPageStyledProps {
    isComponent?: boolean
}

const ErrorPageStyled = styled.section<ErrorPageStyledProps>`
    height: ${({ isComponent }) => isComponent ? '100%' : '100vh' };
    width: ${({ isComponent }) => isComponent ? '100%' : '100vw' };
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .message {
        color: #c23838;
        font-size: 2rem;
    }

    .image-container {
        height: 20rem;
        position: relative;
        margin: 1rem;

        .status {
            position: absolute;
            top: 25%;
            right: 24%;
            font-size: 3rem;
            color: #c23838;
        }

        .error-image {
            height: inherit;
        }
    }
    
`