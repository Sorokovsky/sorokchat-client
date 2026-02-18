export interface SigningService {
  sign(plain: ArrayBuffer, key: ArrayBuffer): Promise<ArrayBuffer>;
  verify(plain: ArrayBuffer, key: ArrayBuffer, signing: ArrayBuffer): Promise<boolean>;
}
