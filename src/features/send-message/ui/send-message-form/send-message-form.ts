import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { inject } from '@angular/core';
import { Component, computed, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import type { z as zod } from 'zod';

import type { Chat, WriteMessagePayload } from '@/entities';
import { MessagesService } from '@/entities';
import { WriteMessageSchema } from '@/entities';
import type { Field } from '@/shared';
import { AbstractForm, UIInput } from '@/shared';

import { TEXT_FIELD } from '../../data';
import { SendButton } from '../send-button/send-button';

@Component({
  selector: 'app-send-message-form',
  imports: [UIInput, ReactiveFormsModule, SendButton],
  templateUrl: './send-message-form.html',
  styleUrl: './send-message-form.scss',
  host: {
    '(send)': 'writeMessage($event)',
  },
})
export class SendMessageForm extends AbstractForm<WriteMessagePayload> {
  private readonly messagesService: MessagesService = inject(MessagesService);

  protected readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly field: Field = TEXT_FIELD;

  protected override getFields(): Signal<Field[]> {
    return signal([TEXT_FIELD]);
  }

  protected override getSchema(): Signal<zod.ZodSchema<WriteMessagePayload>> {
    return computed<zod.ZodSchema<WriteMessagePayload>>(
      (): zod.ZodSchema<WriteMessagePayload> => WriteMessageSchema,
    );
  }

  protected override getIsLoading(): Signal<boolean> {
    return this.isLoading;
  }

  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  protected schema: zod.ZodSchema<WriteMessagePayload> = WriteMessageSchema;

  protected writeMessage(newMessage: WriteMessagePayload): void {
    this.messagesService.writeMessage(newMessage, this.chat().id);
    this.form().reset();
  }
}
