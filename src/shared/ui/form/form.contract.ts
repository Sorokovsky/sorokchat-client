import {type InputType} from '@/shared/ui/form/input-type.contract';
import {type AutoComplete} from '@/shared/ui/form/autocomplete.contract';

export type Field = {
  name: string;
  defaultValue?: string;
  type: InputType;
  label: string;
  placeholder?: string;
  autocomplete: AutoComplete
};
