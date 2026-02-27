import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { GenericSchema } from 'valibot';

import type { RegisterPayload } from '@/entities';
import { RegisterSchema } from '@/entities';
import type { Field } from '@/shared';
import { FormComponent, PagePaths } from '@/shared';

import { REGISTER_FIELDS } from '../../data';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
  imports: [FormComponent, RouterLink],
})
export class RegisterForm {
  protected readonly fields: Field[] = REGISTER_FIELDS;
  protected readonly schema: GenericSchema<RegisterPayload> = RegisterSchema;
  private readonly pathService: PagePaths = inject(PagePaths);
  protected readonly loginUrl: string = this.pathService.loginUrl;

  protected register(payload: RegisterPayload): void {
    console.log(payload);
  }
}
