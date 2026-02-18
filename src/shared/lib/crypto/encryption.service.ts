export interface EncryptionService {
  encrypt(plain: ArrayBuffer, key: ArrayBuffer): Promise<ArrayBuffer>;
  decrypt(encrypted: ArrayBuffer, key: ArrayBuffer): Promise<ArrayBuffer>;
}
