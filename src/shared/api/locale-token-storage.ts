import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { STORAGE_SERVICE } from '@/shared';

import type { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocaleTokenStorage {
  private static readonly KEY: string = 'access-token';

  private readonly storageService: StorageService = inject(STORAGE_SERVICE);

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public readonly token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor() {
    this.loadInitialToken().then();
  }

  public async setToken(token: string): Promise<void> {
    await this.storageService.set(LocaleTokenStorage.KEY, token);
    this.tokenSubject.next(token);
  }

  public getToken(): string | null {
    return this.tokenSubject.value;
  }

  public async clearToken(): Promise<void> {
    await this.storageService.remove(LocaleTokenStorage.KEY);
    this.tokenSubject.next(null);
  }

  private async loadInitialToken(): Promise<void> {
    try {
      const stored: string | null = await this.storageService.get<string>(LocaleTokenStorage.KEY);
      this.tokenSubject.next(stored);
    } catch (error: unknown) {
      console.warn('Не вдалося зчитати токен доступу', error);
      this.tokenSubject.next(null);
    }
  }
}
