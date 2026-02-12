import type { Field } from '@/shared';

export const LOGIN_FIELDS: Field[] = [
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
];
