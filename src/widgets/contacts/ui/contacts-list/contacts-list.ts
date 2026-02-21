import type { InputSignal, Signal } from '@angular/core';
import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import type { GetProfileQuery, User } from '@/entities';
import { injectGetProfile, UserAvatar } from '@/entities';

@Component({
  selector: 'app-contacts-list',
  imports: [UserAvatar, RouterLink, RouterLinkActive],
  templateUrl: './contacts-list.html',
  styleUrl: './contacts-list.scss',
})
export class ContactsList {
  public readonly rootPath: InputSignal<string> = input.required<string>();

  private readonly profile: GetProfileQuery = injectGetProfile();

  protected readonly contacts: Signal<User[]> = computed<User[]>(
    (): User[] => this.profile.data()?.contacts || [],
  );

  protected getLink(contact: User): string {
    return `${this.rootPath()}/${contact.id}`;
  }
}
