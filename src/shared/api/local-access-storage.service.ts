import {Injectable} from '@angular/core';
import {StorageKeys} from '@/shared/models/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class LocalAccessStorageService {
  public getAccessKey(): string | null {
    return localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  }

  public setAccessKey(accessKey: string): void {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessKey);
  }

  public clearAccessKey(): void {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  }
}
