export interface CryptoService {
  encrypt(plainText: string, secretKey: string): string;

  decrypt(plainText: string, secretKey: string): string;
}
