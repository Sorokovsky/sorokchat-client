import {Injectable} from '@angular/core';
import {Client, IFrame, IMessage} from '@stomp/stompjs';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {LocalAccessStorageService} from '@/services/local-access-storage.service';

type MessageSubject = {
  [topic: string]: Subject<any>;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  protected connected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly client: Client;
  private messageSubject: MessageSubject = {};

  constructor(private readonly accessTokenStorage: LocalAccessStorageService) {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: 'Bearer ' + this.accessTokenStorage.getAccessKey() || ""
      },
      debug(message: string): void {
        console.log(message);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 400,
      heartbeatOutgoing: 4000,
    });
    this.client.onConnect = (): void => {
      console.log("WebSocket Connected");
      this.connected.next(true);
    };

    this.client.onStompError = (frame: IFrame): void => {
      console.log("STOMP ERROR: ", frame);
      this.connected.next(false);
    };

    this.client.onWebSocketClose = (): void => {
      console.log("WebSocket Closed");
      this.connected.next(false);
    };
  }

  public connect(): void {
    const token: string | null = this.accessTokenStorage.getAccessKey();
    if (token) {
      this.client.connectHeaders = {
        Authorization: 'Bearer ' + token,
      };
    }
    this.client.activate();
  }

  public disconnect(): void {
    this.client.deactivate();
  }

  public isConnected(): Observable<boolean> {
    return this.connected.asObservable();
  }

  public subscribe<T>(destination: string): Observable<T> {
    if (!this.messageSubject[destination]) {
      this.messageSubject[destination] = new Subject<T>();
    }
    const subject: Subject<T> = this.messageSubject[destination];
    if (!this.client.connected) {
      this.connect();
    }

    this.client.subscribe(
      destination,
      (message: IMessage): void => {
        const body = JSON.parse(message.body);
        subject.next(body);
      },
      {id: `subscription-${destination}`}
    );
    return subject.asObservable();
  }

  public send<T>(destination: string, payload: T): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: `/app${destination}`,
        body: JSON.stringify(payload),
      })
    }
  }
}
