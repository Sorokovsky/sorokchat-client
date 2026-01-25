import {z as zod} from "zod";

const MIN_PASSWORD_LENGTH: number = 8;
const MAX_PASSWORD_LENGTH: number = 20;

export const LoginPayloadScheme = zod.object({
  email: zod.email({message: "Електронна адреса некоректна."}),
  password: zod.string({message: "Пароль має бути рядком."})
    .min(MIN_PASSWORD_LENGTH, {message: `Мінімальний розмір паролю має бути не меньше ніж ${MIN_PASSWORD_LENGTH} символів.`})
    .max(MAX_PASSWORD_LENGTH, {message: `Максимальний розмір паролю не має перевищувати ${MIN_PASSWORD_LENGTH} символів.`})
});

export type LoginPayload = zod.infer<typeof LoginPayloadScheme>;
