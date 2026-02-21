import { User } from '../../user/@x/contacts';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Endpoints } from '@/shared';

@Injectable({
  providedIn: 'root',
})
export class ContactsServie {
  private readonly client: HttpClient = inject(HttpClient);

  public async addContact(email: string): Promise<User> {
    return await lastValueFrom<User>(this.client.post<User>(Endpoints.addToContacts(email), null));
  }

  public async removeContact(id: number): Promise<User> {
    return await lastValueFrom<User>(this.client.delete<User>(Endpoints.removeFromContacts(id)));
  }
}
