import { Component } from '@angular/core';

import { CreateChatAction } from '@/features';
import { Heading } from '@/shared';

@Component({
  selector: 'app-chats-bar-head',
  imports: [Heading, CreateChatAction],
  templateUrl: './chats-bar-head.html',
  styleUrl: './chats-bar-head.scss',
})
export class ChatsBarHead {}
