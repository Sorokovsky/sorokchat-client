import {type InputType} from '@/components/ui/form/input-type.contract';

export type Field = {
  name: string;
  defaultValue?: string;
  type: InputType;
  label: string;
  placeholder?: string;
};
