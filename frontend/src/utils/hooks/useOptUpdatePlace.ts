import { useMutation, useQueryClient } from "react-query"
import useAuth from "./useAuth"
import { updatePlace } from "@/lib/api"
import { Place } from "@/lib/Types"


const useOptUpdatePlace = () => {
    const queryClient = useQueryClient()
    const { loggedUser } = useAuth()


    const updatePlaceMutation = useMutation({
        mutationFn: (place: Place) => {
            console.log(place);
            return updatePlace(place.id, { title: place.title, description: place.description })
        },
        onMutate: async (place: Place) => {
            //Cancel refetches to prevent over-write
            await queryClient.cancelQueries([`${loggedUser?.id}`])

            //get pre-updated data in case of error and rollback
            const prevPlacesData = queryClient.getQueryData([`${loggedUser?.id}`])
            
            //@ts-expect-error
            const index = prevPlacesData.findIndex((p: Place) => p.id === place.id)
            
            let optPlaces: any = prevPlacesData
            optPlaces[index] = place

            //setting the new data to the cache 
            queryClient.setQueryData([`${loggedUser?.id}`], optPlaces)

            return { prevPlacesData }
        },
        onError: (_error, _newPlace, context) => {
            queryClient.setQueryData([`${loggedUser}`], context?.prevPlacesData)
        },
        onSettled: () => queryClient.invalidateQueries()
    })

    return updatePlaceMutation
}

export default (useOptUpdatePlace)