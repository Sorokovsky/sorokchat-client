import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {type Chat} from '@/contracts/chats/chat.contract';
import {lastValueFrom} from 'rxjs';
import {ENDPOINTS} from '@/constants/external/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private readonly client: HttpClient;

  constructor(http: HttpClient) {
    this.client = http;
  }

  public async getChatsByMe(): Promise<Chat[]> {
    return await lastValueFrom<Chat[]>(this.client.get<Chat[]>(ENDPOINTS.GET_CHATS_BY_ME));
  }
}
