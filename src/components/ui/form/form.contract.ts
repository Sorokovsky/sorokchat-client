import {type InputType} from '@/components/ui/form/input-type.contract';
import {type AutoComplete} from '@/components/ui/form/autocomplete.contract';

export type Field = {
  name: string;
  defaultValue?: string;
  type: InputType;
  label: string;
  placeholder?: string;
  autocomplete: AutoComplete
};
