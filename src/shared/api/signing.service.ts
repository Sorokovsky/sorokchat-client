export interface SigningService {
  sign(plainText: string, secretKey: string): string;

  verify(plainText: string, secretKey: string, signing: string): boolean;
}
