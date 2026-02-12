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
];
