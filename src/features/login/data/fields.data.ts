import type { Field } from '@/shared';

export const LOGIN_FIELDS: Field[] = [
  {
    name: 'nickname',
    placeholder: "Ваше унікальне ім'я...",
    autocomplete: 'nickname',
    label: "Унікальне ім'я",
    type: 'text',
    defaultValue: undefined,
  },
  {
    name: 'password',
    placeholder: 'Ваш пароль...',
    autocomplete: 'new-password',
    label: 'Пароль',
    type: 'password',
    defaultValue: undefined,
  },
];
