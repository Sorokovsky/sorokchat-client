import { inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import type { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

import type { StorageService } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AngularStorageService implements StorageService {
  private readonly storage: StorageMap = inject(StorageMap);
  private readonly cache: Map<string, unknown> = new Map<string, unknown>();

  public async get<T>(key: string): Promise<T | null> {
    try {
      const fromCache: T = this.cache.get(key) as T;
      if (fromCache) return fromCache;
      const result: T = await lastValueFrom<T>(this.storage.get(key) as Observable<T>);
      if (result) this.cache.set(key, result);
      return result;
    } catch {
      return null;
    }
  }

  public async set<T>(key: string, data: T): Promise<void> {
    this.cache.set(key, data);
    return await lastValueFrom<void>(this.storage.set(key, data));
  }

  public async contains(key: string): Promise<boolean> {
    const hasInCache: boolean = this.cache.has(key);
    if (hasInCache) return true;
    const hasInStorage: boolean = await lastValueFrom<boolean>(this.storage.has(key));
    return hasInStorage;
  }

  public async remove(key: string): Promise<void> {
    this.cache.delete(key);
    await lastValueFrom(this.storage.delete(key));
  }

  public async clear(): Promise<void> {
    this.cache.clear();
    await lastValueFrom(this.storage.clear());
  }
}
