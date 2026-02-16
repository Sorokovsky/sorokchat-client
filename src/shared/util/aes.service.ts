import { Injectable } from '@angular/core';

import { concatBuffers } from './concat-buffers.util';
import type { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class AesService implements EncryptionService {
  private readonly algorithm: string = 'AES-GCM';
  private readonly keyLength: number = 256;
  private readonly ivLength: number = 12;

  public async encrypt(plain: ArrayBuffer, key: ArrayBuffer): Promise<ArrayBuffer> {
    const iv: Uint8Array<ArrayBuffer> = crypto.getRandomValues(new Uint8Array(this.ivLength));
    const cryptoKey: CryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      {
        name: this.algorithm,
        length: this.keyLength,
      },
      false,
      ['encrypt'],
    );
    const ciphertext: ArrayBuffer = await crypto.subtle.encrypt(
      {
        name: this.algorithm,
        iv,
      },
      cryptoKey,
      plain,
    );
    return concatBuffers(iv.buffer, ciphertext);
  }

  public async decrypt(encrypted: ArrayBuffer, key: ArrayBuffer): Promise<ArrayBuffer> {
    if (encrypted.byteLength < this.ivLength + 16) {
      throw new Error('Некоректна довжина зашифрованого повідомлення.');
    }
    const iv: ArrayBuffer = encrypted.slice(0, this.ivLength);
    const ciphertextAndTag: ArrayBuffer = encrypted.slice(this.ivLength);
    const cryptoKey: CryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      {
        name: this.algorithm,
        length: this.keyLength,
      },
      false,
      ['decrypt'],
    );
    try {
      return await crypto.subtle.decrypt(
        {
          name: this.algorithm,
          iv,
        },
        cryptoKey,
        ciphertextAndTag,
      );
    } catch (error: unknown) {
      console.log(`Помилка розшифровки: ${error}`);
      return encrypted;
    }
  }
}
