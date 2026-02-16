import type { Field } from '@/shared';

export const CREATE_CHAT_FIELDS: Field[] = [
  {
    name: 'name',
    type: 'text',
    autocomplete: 'off',
    defaultValue: '',
    label: "Ім'я чату",
    placeholder: "Ім'я вашого чату",
  },
  {
    name: 'description',
    type: 'text',
    autocomplete: 'off',
    defaultValue: '',
    label: 'Опис чату',
    placeholder: 'Опис вашого чату',
  },
];
