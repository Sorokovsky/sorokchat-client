import { inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import type { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

import type { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AngularStorageService implements StorageService {
  private readonly storage: StorageMap = inject(StorageMap);
  private readonly cache: Map<string, unknown> = new Map<string, unknown>();

  public async set<T>(key: string, value: T): Promise<void> {
    this.cache.set(key, value);
    return await lastValueFrom<void>(this.storage.set(key, value));
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const fromCache: T = this.cache.get(key) as T;
      if (fromCache) return fromCache;
      return await lastValueFrom<T>(this.storage.get(key) as Observable<T>);
    } catch {
      return null;
    }
  }

  public async remove(key: string): Promise<void> {
    this.cache.delete(key);
    return await lastValueFrom(this.storage.delete(key));
  }
  public async contains(key: string): Promise<boolean> {
    const isInCache: boolean = this.cache.has(key);
    const isInStorage: boolean = await lastValueFrom<boolean>(this.storage.has(key));
    return isInCache || isInStorage;
  }

  public async clear(): Promise<void> {
    this.cache.clear();
    return await lastValueFrom<void>(this.storage.clear());
  }
}
