import {Injectable} from '@angular/core';
import {Client, IFrame, IMessage} from '@stomp/stompjs';
import {BehaviorSubject, filter, first, Observable, Subject, switchMap} from 'rxjs';
import {LocalAccessStorageService} from '@/services/local-access-storage.service';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  protected connected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly client: Client;

  constructor(private readonly accessTokenStorage: LocalAccessStorageService) {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: 'Bearer ' + this.accessTokenStorage.getAccessKey() || ""
      },
      webSocketFactory(): WebSocket {
        return new SockJS("http://localhost:8080/ws");
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
    if (!this.client.active) {
      this.client.activate();
    }
  }

  public disconnect(): void {
    this.client.deactivate();
  }

  public isConnected(): Observable<boolean> {
    return this.connected.asObservable();
  }

  public subscribe<T>(destination: string): Observable<T> {
    const subject: Subject<T> = new Subject<T>();
    this.connected.pipe(
      filter((connected: boolean): boolean => connected),
      first(),
      switchMap((): Observable<T> => {
        console.log("Websocket connected and subscribed to ", destination);
        this.client.subscribe(
          destination,
          (message: IMessage): void => {
            try {
              const body: T = JSON.parse(message.body);
              subject.next(body);
            } catch (error) {
              console.log("Websocket parsing error: ", error)
            }
          },
          {id: `sub-${destination}`}
        );
        return subject.asObservable();
      }),
    ).subscribe();
    return subject.asObservable();
  }

  public send<T>(destination: string, payload: T): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(payload),
      })
    }
  }
}
