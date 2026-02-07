import {Component, inject, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/entity/chat/model/chat.contract';
import {LucideAngularModule, type LucideIconData, SendIcon} from 'lucide-angular';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {zodValidator} from '@/shared/models/zod.validator';
import {z as zod} from "zod";
import {NewMessageSchema} from '@/feature/send-message/model/new-message.contract';
import {MessagesService} from '@/entity/message/api/messages.service';

@Component({
  selector: 'app-send-message',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule
  ],
  templateUrl: './send-message.html',
  styleUrl: './send-message.sass',
})
export class SendMessage {
  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  protected readonly icon: LucideIconData = SendIcon;
  protected readonly form: FormGroup;
  private readonly schema: zod.Schema = NewMessageSchema;
  private readonly messagesService: MessagesService = inject(MessagesService);

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      text: [''],
    }, {validators: zodValidator(this.schema)});
  }

  protected onSend(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.messagesService.sendMessage(this.form.value, this.chat().id);
    } else {

    }
    this.form.reset();
  }
}
