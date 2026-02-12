import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleTokenStorage {
  private static readonly KEY: string = 'access-token';

  public setToken(token: string): void {
    localStorage.setItem(LocaleTokenStorage.KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(LocaleTokenStorage.KEY) || '<TOKEN>';
  }

  public clearToken(): void {
    localStorage.removeItem(LocaleTokenStorage.KEY);
  }
}
