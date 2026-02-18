import { inject, Injectable } from '@angular/core';

import type { StorageService } from '../../api';
import { STORAGE_SERVICE } from '../../data';
import type { EcdhKeyPairType } from '../crypto';
import { EcdhService } from '../crypto';

@Injectable({
  providedIn: 'root',
})
export class KeysInfrastructure {
  private static readonly SHARED_KEY_NAME: string = 'shared-key';

  private readonly ecdhService: EcdhService = inject(EcdhService);
  private readonly storageService: StorageService = inject(STORAGE_SERVICE);

  public async getSharedKey(): Promise<string> {
    const fromStorage: string | null = await this.storageService.get<string>(
      KeysInfrastructure.SHARED_KEY_NAME,
    );
    if (fromStorage) return fromStorage;
    const { publicKey, privateKey }: EcdhKeyPairType = await this.ecdhService.generateKeys();
    const sharedKey: string = await this.ecdhService.computeSharedKey(privateKey, publicKey);
    await this.storageService.set(KeysInfrastructure.SHARED_KEY_NAME, sharedKey);
    return sharedKey;
  }
}
