import { memo } from 'react'
import { GoogleMap as GM, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Center, Spinner } from "@chakra-ui/react";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

interface GoogleMapProps {
    location: any,
    zoom: number
}

const containerStyle = {
    width: '100%',
    height: '100%',
};

const GoogleMap = ({ location, zoom }: GoogleMapProps) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY
    })

    return (
        isLoaded ?
            <GM
                mapContainerStyle={containerStyle}
                center={location}
                zoom={zoom}
            >
                <Marker position={location} />
            </GM>
            :
            <Center h='23rem' color='white'>
                <Spinner />
            </Center>
    )
}

export default memo(GoogleMap)