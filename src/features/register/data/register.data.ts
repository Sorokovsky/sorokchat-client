import type { Field } from '@/shared';

export const REGISTER_FIELDS: Field[] = [
  {
    type: 'email',
    name: 'email',
    autocomplete: 'email',
    placeholder: 'Ваша електронна адреса',
    label: 'Електронна адреса',
  },
  {
    type: 'password',
    name: 'password',
    autocomplete: 'new-password',
    placeholder: 'Ваш пароль',
    label: 'Пароль',
  },
  {
    type: 'text',
    name: 'firstName',
    autocomplete: 'name',
    placeholder: "Ваше ім'я",
    label: "Ім'я",
  },
  {
    type: 'text',
    name: 'lastName',
    autocomplete: 'family-name',
    placeholder: 'Ваше прізвище',
    label: 'Прізвище',
  },
  {
    type: 'text',
    name: 'middleName',
    autocomplete: 'additional-name',
    placeholder: 'Ваше по батькові',
    label: 'По батькові',
  },
];
