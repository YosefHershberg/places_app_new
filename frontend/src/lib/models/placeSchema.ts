import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const titleSchema = z.string().min(3).max(40)

export const descriptionSchema = z.string().min(8).max(70)

export const addressSchema = z.string().min(8)

export const placeSchema = z.object({
    title: titleSchema,
    // image: z.any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     "Only .jpg, .jpeg, .png and .webp formats are supported."
    // ),
    image: z.string(),
    description: descriptionSchema,
    address: addressSchema
})

export const updatePlaceSchema = z.object({
    title: titleSchema,
    description: descriptionSchema,
})