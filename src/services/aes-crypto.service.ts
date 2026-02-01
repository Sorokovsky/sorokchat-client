import {Injectable} from '@angular/core';
import {CryptoService} from '@/services/crypto.service';
import {AES, enc} from "crypto-js";

@Injectable({
  providedIn: 'root',
})
export class AesCryptoService implements CryptoService {
  public encrypt(plainText: string, secretKey: string): string {
    return AES.encrypt(plainText, secretKey).toString();
  }

  public decrypt(plainText: string, secretKey: string): string {
    return AES.decrypt(plainText, secretKey).toString(enc.Utf8);
  }

}
