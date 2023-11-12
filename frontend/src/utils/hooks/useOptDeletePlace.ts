import { useMutation, useQueryClient } from "react-query"
import useAuth from "./useAuth"
import { deletePlace } from "@/lib/api"
import { Place } from "@/lib/Types"

const useOptDeletePlace = () => {
    const queryClient = useQueryClient()
    const { loggedUser } = useAuth()


    const deletePlaceMutation = useMutation({
        mutationFn: deletePlace,
        onMutate: async (placeId: string) => {
            //Cancel refetches to prevent over-write
            await queryClient.cancelQueries([`${loggedUser?.id}`])

            //get pre-updated data in case of error and rollback
            const prevPlacesData = queryClient.getQueryData([`${loggedUser?.id}`])
            
            //setting the new data to the cache 
            //@ts-expect-error
            queryClient.setQueryData([`${loggedUser?.id}`], prevPlacesData.filter((place: Place) => place.id !== placeId))
                        
            return { prevPlacesData }
        },
        onError: (_error, _newPlace, context) => {
            queryClient.setQueryData([`${loggedUser}`], context?.prevPlacesData)
        },
        onSettled: () => queryClient.invalidateQueries()
    })

    return deletePlaceMutation
}

export default useOptDeletePlace