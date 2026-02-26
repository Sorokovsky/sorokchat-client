import type { InferOutput } from 'valibot';
import { maxLength, minLength, object, pipe, string } from 'valibot';

const MAX_PASSWORD_LENGTH: number = 32;
const MIN_PASSWORD_LENGTH: number = 8;

export const RegisterSchema = object({
  nickname: string("Унікальне ім'я має бути"),
  displayName: string("Видиме ім'я має бути"),
  password: pipe(
    string('Пароль має бути'),
    minLength(MIN_PASSWORD_LENGTH, `Мінімальна довжина паролю ${MIN_PASSWORD_LENGTH}`),
    maxLength(MAX_PASSWORD_LENGTH, `Максимальна довжина паролю ${MAX_PASSWORD_LENGTH}`),
  ),
});

export type RegisterPayload = InferOutput<typeof RegisterSchema>;
