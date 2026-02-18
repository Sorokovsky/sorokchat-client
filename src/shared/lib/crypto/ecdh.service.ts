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
    return bufferToBase64(sharedKey);
  }

  private async importPublicKey(base64PublicKey: string): Promise<CryptoKey> {
    const buffer: ArrayBuffer = base64ToBuffer(base64PublicKey);
    return await crypto.subtle.importKey(
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

  private async importPrivateKey(base64PrivateKey: string): Promise<CryptoKey> {
    const buffer: ArrayBuffer = base64ToBuffer(base64PrivateKey);
    return await crypto.subtle.importKey(
      'pkcs8',
      buffer,
      { name: EcdhService.NAME, namedCurve: EcdhService.CURVE_NAME },
      true,
      ['deriveBits', 'deriveKey'],
    );
  }
}
