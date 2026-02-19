import { inject } from '@angular/core';

import type { EncryptionService, SigningService } from '@/shared';
import {
  base64ToBuffer,
  bufferToBase64,
  ENCRYPTION_SERVICE,
  KeysInfrastructure,
  SIGNING_SERVICE,
} from '@/shared';

import type { NewMessagePayload, WriteMessagePayload } from '../models';

export async function prepareMessageToSending(
  payload: WriteMessagePayload,
): Promise<NewMessagePayload> {
  const keysInfrastructure: KeysInfrastructure = inject(KeysInfrastructure);
  const encryptionService: EncryptionService = inject(ENCRYPTION_SERVICE);
  const signingService: SigningService = inject(SIGNING_SERVICE);
  const textBytes: ArrayBuffer = new TextEncoder().encode(payload.text).buffer;
  const sharedKey: string = await keysInfrastructure.getSharedKey();
  const keyBytes: ArrayBuffer = base64ToBuffer(sharedKey);
  const encryptedBytes: ArrayBuffer = await encryptionService.encrypt(textBytes, keyBytes);
  const signing: ArrayBuffer = await signingService.sign(encryptedBytes, keyBytes);
  return {
    text: bufferToBase64(encryptedBytes),
    mac: bufferToBase64(signing),
  };
}
