import type { Field } from '@/shared';

export const REGISTER_FIELDS: Field[] = [
  {
    name: 'nickname',
    placeholder: "Ваше унікальне ім'я...",
    autocomplete: 'nickname',
    label: "Унікальне ім'я",
    type: 'text',
    defaultValue: undefined,
  },
  {
    name: 'displayName',
    placeholder: "Ваше видиме ім'я...",
    autocomplete: 'username',
    label: "Видиме ім'я",
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
