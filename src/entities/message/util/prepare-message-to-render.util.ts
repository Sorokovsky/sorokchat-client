import { inject } from '@angular/core';

import type { EncryptionService, SigningService } from '@/shared';
import { base64ToBuffer, ENCRYPTION_SERVICE, KeysInfrastructure, SIGNING_SERVICE } from '@/shared';

import type { Chat } from '../../chat/@x/message';
import type { User } from '../../user/@x/message';
import type { ChatMessagePayload, MessagePayload } from '../models';

export async function prepareMessageToRender(
  message: MessagePayload,
  chat: Chat,
): Promise<ChatMessagePayload> {
  const encryptionService: EncryptionService = inject(ENCRYPTION_SERVICE);
  const signingService: SigningService = inject(SIGNING_SERVICE);
  const keysInfrastructure: KeysInfrastructure = inject(KeysInfrastructure);
  const user: User | undefined = chat.members.find(
    (member: User): boolean => member.id === message.authorId,
  );
  const signingBuffer: ArrayBuffer = base64ToBuffer(message.mac);
  const encryptedBuffer: ArrayBuffer = base64ToBuffer(message.text);
  const keyBuffer: ArrayBuffer = base64ToBuffer(await keysInfrastructure.getSharedKey());
  const isSuggested: boolean = await signingService.verify(
    encryptedBuffer,
    keyBuffer,
    signingBuffer,
  );
  const decryptedBuffer: ArrayBuffer = await encryptionService.decrypt(encryptedBuffer, keyBuffer);
  return {
    text: new TextDecoder().decode(decryptedBuffer),
    suggested: isSuggested,
    author: user,
    chatId: chat.id,
    updatedAt: message.updatedAt,
    createdAt: message.createdAt,
  };
}
