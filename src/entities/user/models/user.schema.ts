import { z as zod } from 'zod';

import { BaseSchema } from '@/shared';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 32;

export const UserSchema = BaseSchema.extend({
  email: zod
    .email({ message: 'Електронна адреса не коректна.' })
    .nonempty({ message: 'Електронна адреса повинна бути.' }),
  password: zod
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      message: `Мінімальна довжина паролю: ${MIN_PASSWORD_LENGTH} символів.`,
    })
    .max(MAX_PASSWORD_LENGTH, {
      message: `Максимальна довжина паролю: ${MAX_PASSWORD_LENGTH} символів.`,
    }),
  firstName: zod.string().nonempty({ message: 'Імʼя повинно бути.' }),
  lastName: zod.string().nonempty({ message: 'Прізвище повинно бути.' }),
  middleName: zod.string().nonempty({ message: 'По батькові повинно бути.' }),
});

export type User = zod.infer<typeof UserSchema>;
