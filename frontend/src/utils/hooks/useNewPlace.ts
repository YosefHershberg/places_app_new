import { useCallback, useMemo, useState, useRef, useEffect } from "react"
import useHttpClient from "./useHttpClient"
import { addressSchema, descriptionSchema, titleSchema } from "@/lib/models/placeSchema"
import { useNavigate } from "react-router-dom"
import { isResponseStatusSuccess } from "../helperFunctions"
import useAuth from "./useAuth"
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export interface NewPlaceType {
  title: string,
  description: string,
  address: string,
  image: string | Blob
}

interface bluredInputsType {
  title: boolean,
  description: boolean,
  address: boolean,
}

const useNewPlace = () => {
  const navigate = useNavigate()
  const { loggedUser } = useAuth()

  const emptyForm = useMemo<NewPlaceType>(() => ({
    title: '',
    description: '',
    address: '',
    image: ''
  }), [])

  const [newPlaceData, setNewPlaceData] = useState<NewPlaceType>(emptyForm)
  const [bluredInputs, setBluredInputs] = useState<bluredInputsType>({
    title: false,
    description: false,
    address: false,
  })

  const newFormRef = useRef<FormData | null>(null)

  const { data, error, isLoading, triggerHttpReq, responseStatus } = useHttpClient({
    API_URL: `${SERVER_URL}/places/`,
    httpMethod: 'POST',
    // body: newPlaceData
    body: newFormRef.current
  })

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
    setNewPlaceData({ ...newPlaceData, [e.target.name]: e.target.value })
  }, [newPlaceData])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('title', newPlaceData.title)
    formData.append('description', newPlaceData.description)
    formData.append('address', newPlaceData.address)
    formData.append('image', newPlaceData.image)
    newFormRef.current = formData

    triggerHttpReq()
  }, [newPlaceData])

  const handleFileChange = useCallback((file: string | Blob) => {
    setNewPlaceData({ ...newPlaceData, image: file })
  }, [newPlaceData])

  const isTitleValid = useMemo(() => {
    return bluredInputs.title && !(titleSchema.safeParse(newPlaceData?.title).success)
  }, [bluredInputs, newPlaceData])

  const isDescriptionValid = useMemo(() => {
    return bluredInputs.description && !(descriptionSchema.safeParse(newPlaceData?.description).success)
  }, [bluredInputs, newPlaceData])

  const isAddressValid = useMemo(() => {
    return (bluredInputs.address && !(addressSchema.safeParse(newPlaceData?.address).success))
  }, [bluredInputs, newPlaceData])

  useEffect(() => {
    if (responseStatus && isResponseStatusSuccess(responseStatus)) {
      navigate(`/${loggedUser?.id}/places`)
    }
  }, [responseStatus]);

  return {
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    newPlaceData,
    bluredInputs,
    isTitleValid,
    isDescriptionValid,
    isAddressValid,
    handleFileChange,
    response: {
      data, error, isLoading
    }
  }
}

export default useNewPlace