import {Injectable} from '@angular/core';
import {type SigningService} from '@/services/cryptology/signing.service';
import {HmacSHA256} from "crypto-js";

@Injectable({
  providedIn: 'root',
})
export class HmacSigningService implements SigningService {
  public sign(plainText: string, secretKey: string): string {
    return HmacSHA256(plainText, secretKey).toString();
  }

  public verify(plainText: string, secretKey: string, signing: string): boolean {
    return this.sign(plainText, secretKey) === signing;
  }

}
