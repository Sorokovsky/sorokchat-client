import {type Field} from '@/shared/ui/form/form.contract';

export const LOGIN_FIELDS: Field[] = [
  {
    type: "email",
    label: "Електронна адреса",
    name: "email",
    placeholder: "Ваша електронна адреса",
    autocomplete: "email"
  },
  {
    type: "password",
    label: "Пароль",
    name: "password",
    placeholder: "Ваш пароль",
    autocomplete: "current-password"
  }
];
