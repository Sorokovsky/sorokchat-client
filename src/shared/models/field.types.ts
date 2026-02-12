import type { Autocomplete } from './autocomplete.types';
import type { InputType } from './input-type.types';

export interface Field {
  name: string;
  type: InputType;
  placeholder: string;
  autocomplete: Autocomplete;
  defaultValue?: string;
}
