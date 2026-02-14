import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { Component, computed, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import type { z as zod } from "zod";

import type { Chat, GetProfileQuery } from '@/entities';
import { injectGetProfile } from '@/entities';
import type { Field } from "@/shared";
import { AbstractForm, UIInput } from "@/shared";

import { TEXT_FIELD } from '../../data';
import type { NewMessagePayload } from '../../models';
import { NewMessageSchema } from '../../models';
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
export class SendMessageForm extends AbstractForm<NewMessagePayload> {

  protected readonly isLoading: WritableSignal<boolean> = signal(false);

  protected readonly field: Field = TEXT_FIELD;

  protected override getFields(): Signal<Field[]> {
    return signal([TEXT_FIELD]);
  }

  protected override getSchema(): Signal<zod.ZodSchema<NewMessagePayload>> {
    return computed<zod.ZodSchema<NewMessagePayload>>((): zod.ZodSchema<NewMessagePayload> => NewMessageSchema);
  }

  protected override getIsLoading(): Signal<boolean> {
    return this.isLoading;
  }

  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  protected schema: zod.ZodSchema<NewMessagePayload> = NewMessageSchema;
  private readonly protfile: GetProfileQuery = injectGetProfile();

  protected writeMessage(newMessage: NewMessagePayload): void {
    console.log(newMessage);
    this.form().reset();
  }
}
