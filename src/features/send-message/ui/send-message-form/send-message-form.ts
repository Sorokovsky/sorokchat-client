import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { Component, computed, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import type { z as zod } from "zod";

import type { Chat, GetProfileQuery, WriteMessagePayload } from '@/entities';
import { injectGetProfile, WriteMessageSchema } from '@/entities';
import type { Field } from "@/shared";
import { AbstractForm, UIInput } from "@/shared";

import { TEXT_FIELD } from '../../data';
import { SendButton } from "../send-button/send-button";

@Component({
  selector: 'app-send-message-form',
  imports: [UIInput, ReactiveFormsModule, SendButton],
  templateUrl: './send-message-form.html',
  styleUrl: './send-message-form.scss',
  host: {
    '(send)': 'writeMessage($event)'
  }
})
export class SendMessageForm extends AbstractForm<WriteMessagePayload> {

  protected readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly field: Field = TEXT_FIELD;

  protected override getFields(): Signal<Field[]> {
    return signal([TEXT_FIELD]);
  }

  protected override getSchema(): Signal<zod.ZodSchema<WriteMessagePayload>> {
    return computed<zod.ZodSchema<WriteMessagePayload>>((): zod.ZodSchema<WriteMessagePayload> => WriteMessageSchema);
  }

  protected override getIsLoading(): Signal<boolean> {
    return this.isLoading;
  }

  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  protected schema: zod.ZodSchema<WriteMessagePayload> = WriteMessageSchema;
  private readonly protfile: GetProfileQuery = injectGetProfile();

  protected writeMessage(newMessage: WriteMessagePayload): void {
    console.log(newMessage);
    this.form().reset();
  }
}
