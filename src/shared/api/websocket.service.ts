import type { Signal, WritableSignal } from '@angular/core';
import { inject, Injectable, Injector, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Frame, IMessage } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import type { Observer } from 'rxjs';
import { Observable } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly _isConnected: WritableSignal<boolean> = signal<boolean>(false);
  private readonly injector: Injector = inject(Injector);
  private readonly messageQueue: { destination: string; body: string }[] = [];
  private subcribers: number = 0;

  private readonly client: Client;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 1000,
      heartbeatIncoming: 1000,
      heartbeatOutgoing: 1000,
      debug: (str: string) => console.log(str),
    });
    this.setupHandlers(this.client);
  }

  public readonly isConnected: Signal<boolean> = this._isConnected.asReadonly();

  public subscribe<T>(topic: string): Signal<T | undefined> {
    this.connect();
    const observable: Observable<T> = new Observable<T>((observer: Observer<T>): (() => void) => {
      this.subcribers += 1;
      const subsrciption = this.client.subscribe(topic, (message: IMessage): void => {
        observer.next(JSON.parse(message.body) as T);
      });
      return () => {
        subsrciption.unsubscribe();
        this.subcribers -= 1;
        setTimeout(() => {
          if (this.subcribers === 0) this.disconnect();
        }, 500);
      };
    });
    return toSignal(observable, { initialValue: undefined, injector: this.injector });
  }

  public send<T>(destination: string, body: T): void {
    const payload = { destination, body: JSON.stringify(body) };
    if (this.client.connected) {
      this.client.publish(payload);
    } else {
      this.messageQueue.push(payload);
      this.connect();
    }
  }

  private connect(): void {
    if (!this.client.active) {
      this.client.activate();
    }
  }

  private disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  private setupHandlers(client: Client): void {
    client.onConnect = () => {
      this._isConnected.set(true);
      console.log('STOMP Підключено');
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        if (message) this.client.publish(message);
      }
    };

    client.onStompError = (frame: Frame): void => {
      this._isConnected.set(false);
      console.log('STOMP помилка: ', frame);
    };

    client.onWebSocketClose = () => {
      this._isConnected.set(false);
      console.log("WebSocket з'єднання закрито");
    };
  }
}
