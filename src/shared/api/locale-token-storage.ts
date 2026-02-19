import { inject, Injectable } from '@angular/core';

import { STORAGE_SERVICE } from '@/shared';

import type { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocaleTokenStorage {
  private static readonly KEY: string = 'access-token';

  private readonly storageService: StorageService = inject(STORAGE_SERVICE);

  public async setToken(token: string): Promise<void> {
    await this.storageService.set(LocaleTokenStorage.KEY, token);
  }

  public async getToken(): Promise<string | null> {
    return await this.storageService.get<string>(LocaleTokenStorage.KEY);
  }

  public async clearToken(): Promise<void> {
    await this.storageService.remove(LocaleTokenStorage.KEY);
  }
}
