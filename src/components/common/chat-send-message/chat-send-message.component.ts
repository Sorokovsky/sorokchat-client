import {Component, input, InputSignal} from '@angular/core';
import {Chat} from '@/contracts/chat.contract';
import {injectProfileQuery, ProfileQuery} from '@/injections/profile.query';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {zodValidator} from '@/validators/zod.validator';
import {NewMessageSchema} from '@/contracts/new-message.contract';
import {MessagesService} from '@/services/messages.service';
import {Message} from '@/contracts/message.contract';

@Component({
  selector: 'app-chat-send-message',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './chat-send-message.component.html',
  styleUrl: './chat-send-message.component.sass',
})
export class ChatSendMessageComponent {
  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  protected readonly profile: ProfileQuery = injectProfileQuery();
  protected readonly formGroup: FormGroup;

  constructor(builder: FormBuilder, private readonly messagesService: MessagesService) {
    this.formGroup = builder.group({
      text: ['']
    }, {validators: zodValidator(NewMessageSchema)});
  }

  protected sendMessage(): void {
    if (this.formGroup.valid) {
      const newMessage: Message = this.formGroup.value;
      this.messagesService.sendMessage(newMessage, this.chat().id, this.profile.data()!.id);
      this.formGroup.reset();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
