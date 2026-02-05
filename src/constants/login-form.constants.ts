import {type Field} from '@/components/ui/form/form.contract';

export const LOGIN_FIELDS: Field[] = [
  {
    type: "email",
    label: "Електронна адреса",
    name: "email",
    placeholder: "Ваша електронна адреса"
  },
  {
    type: "password",
    label: "Пароль",
    name: "password",
    placeholder: "Ваш пароль"
  }
];
