import { Injectable } from '@angular/core';

import { base64ToBuffer, bufferToBase64 } from '@/shared';

import type { EcdhKeyPairType } from './ecdh-key-pair.type';

@Injectable({
  providedIn: 'root',
})
export class EcdhService {
  private static readonly NAME: string = 'ECDH';
  private static readonly CURVE_NAME: string = 'P-256';
  private static readonly BITS_LENGTH: number = 256;

  public async generateKeys(): Promise<EcdhKeyPairType> {
    const pair: CryptoKeyPair = await crypto.subtle.generateKey(
      {
        name: EcdhService.NAME,
        namedCurve: EcdhService.CURVE_NAME,
      },
      true,
      ['deriveBits', 'deriveKey'],
    );
    const publicKey: string = bufferToBase64(await crypto.subtle.exportKey('raw', pair.publicKey));
    const privateKey: string = bufferToBase64(
      await crypto.subtle.exportKey('pkcs8', pair.privateKey),
    );
    return { publicKey, privateKey };
  }

  public async computeSharedKey(myPrivateKey: string, otherPublicKey: string): Promise<string> {
    const sharedKey: ArrayBuffer = await crypto.subtle.deriveBits(
      { name: EcdhService.NAME, public: await this.importPublicKey(otherPublicKey) },
      await this.importPrivateKey(myPrivateKey),
      EcdhService.BITS_LENGTH,
    );
    const baseKey: CryptoKey = await crypto.subtle.importKey(
      'raw',
      sharedKey,
      { name: 'HKDF' },
      false,
      ['deriveKey', 'deriveBits'],
    );
    const derivedKey: CryptoKey = await crypto.subtle.deriveKey(
      {
        name: 'HKDF',
        hash: 'SHA-256',
        salt: new Uint8Array(0),
        info: new TextEncoder().encode('chat-message-encryption-v1'),
      },
      baseKey,
      { name: 'AES-GCM', length: EcdhService.BITS_LENGTH },
      true,
      ['encrypt', 'decrypt'],
    );
    return bufferToBase64(await crypto.subtle.exportKey('raw', derivedKey));
  }

  private importPublicKey(base64PublicKey: string): Promise<CryptoKey> {
    const buffer: ArrayBuffer = base64ToBuffer(base64PublicKey);
    return crypto.subtle.importKey(
      'raw',
      buffer,
      {
        name: EcdhService.NAME,
        namedCurve: EcdhService.CURVE_NAME,
      },
      true,
      [],
    );
  }

  private importPrivateKey(base64PrivateKey: string): Promise<CryptoKey> {
    const buffer: ArrayBuffer = base64ToBuffer(base64PrivateKey);
    return crypto.subtle.importKey(
      'pkcs8',
      buffer,
      { name: EcdhService.NAME, namedCurve: EcdhService.CURVE_NAME },
      true,
      ['deriveBits', 'deriveKey'],
    );
  }
}
