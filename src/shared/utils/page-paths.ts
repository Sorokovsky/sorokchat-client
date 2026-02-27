import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagePaths {
  public readonly authorization: string = 'authorization';
  public readonly register: string = 'register';
  public readonly login: string = 'login';

  public get registerUrl(): string {
    return `/${this.authorization}/${this.register}`;
  }

  public get loginUrl(): string {
    return `/${this.authorization}/${this.login}`;
  }
}
