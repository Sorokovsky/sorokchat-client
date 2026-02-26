import type { Autocomplete } from './autocomplete.types';
import type { InputType } from './input-type';

export interface Field {
  type: InputType;
  name: string;
  placeholder: string;
  autocomplete: Autocomplete;
  label: string;
  defaultValue: string | undefined;
}
