export type InputType =
  | 'text' | 'number' | 'password' | 'email' | 'tel'
  | 'url' | 'date' | 'checkbox' | 'radio' | 'file'
  | 'button' | 'submit' | 'reset' | 'hidden' | 'search'
  | 'color' | 'range' | 'datetime-local' | 'month' | 'week' | 'time';

export type Field = {
  name: string;
  label: string;
  type: InputType
  placeholder?: string;
  autocomplete?: string;
};
