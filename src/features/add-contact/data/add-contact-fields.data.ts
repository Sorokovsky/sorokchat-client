import type { Field } from '@/shared';

export const ADD_CONTACT_FIELDS: Field[] = [
  {
    label: 'Електронна адреса',
    placeholder: 'Введіть електронну адресу',
    type: 'email',
    defaultValue: '',
    name: 'email',
    autocomplete: 'email',
  },
];
