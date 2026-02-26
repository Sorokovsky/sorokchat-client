import { Component } from '@angular/core';
import type { GenericSchema } from 'valibot';

import type { RegisterPayload } from '@/entities';
import { RegisterSchema } from '@/entities';
import type { Field } from '@/shared';
import { FormComponent } from '@/shared';

import { REGISTER_FIELDS } from '../../data';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
  imports: [FormComponent],
})
export class RegisterForm {
  protected readonly fields: Field[] = REGISTER_FIELDS;
  protected readonly schema: GenericSchema<RegisterPayload> = RegisterSchema;
}
