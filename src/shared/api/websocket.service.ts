import type { Signal, WritableSignal } from '@angular/core';
import { inject } from '@angular/core';
import { Injectable, signal } from '@angular/core';
import type { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';

import { LocaleTokenStorage } from './locale-token-storage';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly localeTokenStorage: LocaleTokenStorage = inject(LocaleTokenStorage);

  private readonly _isConnected: WritableSignal<boolean> = signal(false);
  private readonly messageSubjects: Map<string, BehaviorSubject<unknown>> = new Map<
    string,
    BehaviorSubject<unknown>
  >();
  private readonly currentSubscriptions: Map<string, StompSubscription> = new Map<
    string,
    StompSubscription
  >();
  private readonly client: Client;

  public readonly isConnected: Signal<boolean> = this._isConnected.asReadonly();

  constructor() {
    this.client = new Client({
      webSocketFactory: (): WebSocket => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str: string): void => console.debug('[STOMP]', str),
      beforeConnect: async (): Promise<void> => {
        const accessToken: string | null = await this.localeTokenStorage.getToken();
        this.client.connectHeaders = {
          Authorization: `Bearer ${accessToken || '<TOKEN>'}`,
        };
      },
    });

    this.setupHandlers();
  }

  public activate(): void {
    if (!this.client.active) this.client.activate();
  }

  public deactivate(): void {
    if (this.client.active) this.client.deactivate();
  }

  public subscribe(destination: string): Observable<unknown> {
    if (!this.messageSubjects.has(destination)) {
      const subject = new BehaviorSubject<unknown>(null);
      this.messageSubjects.set(destination, subject);

      this.resubscribeIfConnected(destination, subject);
    }

    return this.messageSubjects.get(destination)!.asObservable();
  }

  private resubscribeIfConnected(destination: string, subject: BehaviorSubject<unknown>): void {
    if (this.client.connected) {
      const subscription: StompSubscription = this.client.subscribe(
        destination,
        (msg: IMessage): void => {
          console.log(msg);
          try {
            const body = JSON.parse(msg.body);
            subject.next(body);
          } catch (err) {
            console.error(`[STOMP] Parse error @ ${destination}`, msg.body, err);
            subject.next(null);
          }
        },
      );

      this.currentSubscriptions.set(destination, subscription);
    }
  }

  public unsubscribe(destination: string): void {
    const subject = this.messageSubjects.get(destination);
    if (subject) {
      subject.complete();
      this.messageSubjects.delete(destination);
    }

    const subscription = this.currentSubscriptions.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      this.currentSubscriptions.delete(destination);
    }

    if (this.messageSubjects.size === 0 && this.client.connected) {
      this.client.deactivate();
    }
  }

  public send(destination: string, body: unknown): void {
    if (!this.client.connected) {
      console.warn('[STOMP] Не підключено →', destination);
      return;
    }
    this.client.publish({ destination, body: JSON.stringify(body) });
  }

  private setupHandlers(): void {
    this.client.onConnect = () => {
      this._isConnected.set(true);
      console.log('[STOMP] Підключено');

      this.currentSubscriptions.clear();

      for (const [destination, subject] of this.messageSubjects.entries()) {
        const sub = this.client.subscribe(destination, (msg: IMessage) => {
          try {
            const body = JSON.parse(msg.body);
            subject.next(body);
          } catch (error: unknown) {
            console.error(`[STOMP] Reconnect parse error @ ${destination}`, error);
            subject.next(null);
          }
        });

        this.currentSubscriptions.set(destination, sub);
      }
    };

    this.client.onDisconnect = () => {
      this._isConnected.set(false);
      console.log('[STOMP] Відключено');
    };

    this.client.onWebSocketError = (event) => console.error('[WS error]', event);
    this.client.onStompError = (frame: IFrame) => console.error('[STOMP error]', frame);
  }
}
