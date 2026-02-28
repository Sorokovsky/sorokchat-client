import type { InferOutput } from 'valibot';
import {
  email,
  maxLength,
  minLength,
  nonEmpty,
  object,
  optional,
  pipe,
  string,
  transform,
} from 'valibot';

import { BaseSchema } from '@/shared';

const MAX_PASSWORD_LENGTH: number = 32;
const MIN_PASSWORD_LENGTH: number = 8;

export const UserSchema = object({
  ...BaseSchema.entries,
  nickname: pipe(
    string(),
    nonEmpty("Унікальне ім'я має бути."),
    transform((value: string): string => value.replace(/\s+/g, '-')),
  ),
  displayName: pipe(string(), nonEmpty("Видиме ім'я має бути.")),
  password: pipe(
    string(),
    nonEmpty('Пароль має бути.'),
    minLength(MIN_PASSWORD_LENGTH, `Мінімальна довжина паролю ${MIN_PASSWORD_LENGTH}.`),
    maxLength(MAX_PASSWORD_LENGTH, `Максимальна довжина паролю ${MAX_PASSWORD_LENGTH}.`),
  ),
  phoneNumber: optional(string('Номер телнфону маєбути рядком')),
  email: optional(pipe(string(), email('Некоректна електронна адреса.'))),
});

export type UserPayload = InferOutput<typeof UserSchema>;
