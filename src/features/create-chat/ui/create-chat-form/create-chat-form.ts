import type { OutputEmitterRef } from '@angular/core';
import { Component, output } from '@angular/core';
import type { z as zod } from 'zod';

import type { NewChat } from '@/entities';
import { NewChatSchema } from '@/entities';
import type { Field } from '@/shared';
import { Form } from '@/shared';

import { injectCreateChat } from '../../api';
import { CREATE_CHAT_FIELDS } from '../../data';
import type { CreateChat } from '../../models';

@Component({
  selector: 'app-create-chat-form',
  imports: [Form],
  templateUrl: './create-chat-form.html',
  styleUrl: './create-chat-form.scss',
})
export class CreateChatForm {
  public send: OutputEmitterRef<void> = output();

  protected readonly title: string = 'Створення чату';
  protected readonly submitText: string = 'Створити';
  protected readonly schema: zod.ZodSchema<NewChat> = NewChatSchema;
  protected readonly fields: Field[] = CREATE_CHAT_FIELDS;
  protected readonly mutation: CreateChat = injectCreateChat();

  protected create(payload: NewChat): void {
    this.mutation.mutate(payload);
    this.send.emit();
  }
}
