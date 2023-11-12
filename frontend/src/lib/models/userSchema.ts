import { z } from 'zod'

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const emailSchema = z.string().email();

export const passwordSchema = z.string().min(6);

export const nameSchema = z.string().min(3)

export const UserLoginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export type UserLogin = z.infer<typeof UserLoginSchema>

export const UserRegisterSchema = z.object({
    name: nameSchema,
    // image: z.any()
    //     .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    //     .refine(
    //         (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //         "Only .jpg, .jpeg, .png and .webp formats are supported."
    //     ),
    image: z.string(),
    email: emailSchema,
    password: passwordSchema
})

export type UserRegister = z.infer<typeof UserRegisterSchema>
