import { Injectable } from '@angular/core';

import type { SigningService } from './signing.service';

@Injectable({
  providedIn: 'root',
})
export class HmacService implements SigningService {
  public async sign(plain: ArrayBuffer, key: ArrayBuffer): Promise<ArrayBuffer> {
    const cryptoKey: CryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['sign'],
    );
    return await crypto.subtle.sign('HMAC', cryptoKey, plain);
  }

  public async verify(
    plain: ArrayBuffer,
    key: ArrayBuffer,
    signing: ArrayBuffer,
  ): Promise<boolean> {
    const cryptoKey: CryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['verify'],
    );
    return await crypto.subtle.verify('HMAC', cryptoKey, signing, plain);
  }
}
