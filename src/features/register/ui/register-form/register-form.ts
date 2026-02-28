import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { GenericSchema } from 'valibot';

import type { RegisterPayload } from '@/entities';
import { RegisterSchema } from '@/entities';
import type { Field } from '@/shared';
import { FormComponent, PagePaths } from '@/shared';

import { REGISTER_FIELDS } from '../../data';
import type { Register } from '../../models';
import { injectRegister } from '../../api';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
  imports: [FormComponent, RouterLink],
})
export class RegisterForm {
  private readonly pathService: PagePaths = inject(PagePaths);
  private readonly mutation: Register = injectRegister();

  protected readonly fields: Field[] = REGISTER_FIELDS;
  protected readonly schema: GenericSchema<RegisterPayload> = RegisterSchema;
  protected readonly loginUrl: string = this.pathService.loginUrl;

  protected register(payload: RegisterPayload): void {
    this.mutation.mutate(payload);
  }
}
