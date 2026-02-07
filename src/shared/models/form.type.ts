import {type AutoComplete, type InputType} from '@/shared/models';

export type Field = {
  name: string;
  defaultValue?: string;
  type: InputType;
  label: string;
  placeholder?: string;
  autocomplete: AutoComplete
};
