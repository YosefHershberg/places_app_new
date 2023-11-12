import { titleSchema, descriptionSchema } from '@/lib/models/placeSchema'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useOptUpdatePlace from './useOptUpdatePlace'
import { Place } from '@/lib/Types'
import { useQueryClient } from 'react-query'

interface bluredInputsType {
    title: boolean,
    description: boolean,
}

const useUpdatePlace = () => {
    const { state: place } = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [placeData, setPlaceData] = useState<Place>(place)
    const [bluredInputs, setBluredInputs] = useState<bluredInputsType>({
        title: false,
        description: false,
    })

    const updatePlaceMutation = useOptUpdatePlace()

    useEffect(() => {
        //this is because on refresh the query doesn't exist
        if (!queryClient.getQueryData([`${place.creator}`])) {
            navigate(`/${place.creator}/places`)
        }
    }, [])

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        setBluredInputs({
            ...bluredInputs,
            [e.target.name]: true
        })
    }, [bluredInputs])

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        setBluredInputs({
            ...bluredInputs,
            [e.target.name]: false
        })
    }, [bluredInputs])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaceData({ ...placeData, [e.target.name]: e.target.value })
    }, [placeData])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updatePlaceMutation.mutate(placeData)
        navigate(`/${place.creator}/places`)
    }, [placeData])

    const isTitleValid = useMemo(() => {
        return bluredInputs.title && !(titleSchema.safeParse(placeData?.title).success)
    }, [bluredInputs, placeData])

    const isDescriptionValid = useMemo(() => {
        return bluredInputs.description && !(descriptionSchema.safeParse(placeData?.description).success)
    }, [bluredInputs, placeData])

    return {
        handleBlur,
        handleChange,
        handleFocus,
        handleSubmit,
        placeData,
        bluredInputs,
        isTitleValid,
        isDescriptionValid,
    }
}

export default useUpdatePlace