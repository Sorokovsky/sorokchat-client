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

  public async set<T>(key: string, value: T): Promise<void> {
    return await lastValueFrom<void>(this.storage.set(key, value));
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      return await lastValueFrom<T>(this.storage.get(key) as Observable<T>);
    } catch {
      return null;
    }
  }

  public async remove(key: string): Promise<void> {
    return await lastValueFrom(this.storage.delete(key));
  }
  public async contains(key: string): Promise<boolean> {
    return await lastValueFrom<boolean>(this.storage.has(key));
  }

  public async clear(): Promise<void> {
    return await lastValueFrom<void>(this.storage.clear());
  }
}
