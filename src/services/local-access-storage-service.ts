import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalAccessStorageService {
  private static KEY: string = "access-storage";

  public getAccessKey(): string | null {
    return localStorage.getItem(LocalAccessStorageService.KEY);
  }

  public setAccessKey(accessKey: string): void {
    localStorage.setItem(LocalAccessStorageService.KEY, accessKey);
  }

  public clearAccessKey(): void {
    localStorage.removeItem(LocalAccessStorageService.KEY);
  }
}
