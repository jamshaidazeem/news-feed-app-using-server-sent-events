import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, finalize, Observable, Subscriber } from 'rxjs';
import { TypeSection } from '../models/section.type';
import { TypeSSEEvent } from '../models/sse-event.type';

const BASE_URL = 'http://localhost:3000';

export const SSE_CONNECTED = 'sse connection is opened';
export const SSE_ERROR = 'sse error';
export const SSE_EVENT_TYPE_MSG = 'message';
export const SSE_EVENT_TYPE_NEWS = 'news';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  sseEventSource?: EventSource;

  constructor(private http: HttpClient) {}

  getSections() {
    const url = `${BASE_URL}/sections`;
    return this.http.get(url).pipe(
      map((response: any) => {
        let data: TypeSection[] = [];
        if (response.results && Array.isArray(response.results)) {
          data = response.results as TypeSection[];
        }
        return data;
      }),
      catchError((error) => {
        throw error;
      }),
      finalize(() => {
        console.log(`get sections finalize`);
      })
    );
  }

  registerEventSourceForSSE(section: string): Observable<TypeSSEEvent> {
    return new Observable((subscriber: Subscriber<any>) => {
      this.sseEventSource = new EventSource(
        `${BASE_URL}/sse?section=${section}`
      );

      this.sseEventSource.onopen = () => {
        subscriber.next({
          data: SSE_CONNECTED,
          eventType: SSE_CONNECTED,
        });
      };

      this.sseEventSource.onerror = () => {
        subscriber.next({
          data: SSE_ERROR,
          eventType: SSE_ERROR,
        });
      };

      /* only gets fired only if event.type === 'message', so for any other types or handling multiple events use addeventlistener for each type */
      this.sseEventSource.onmessage = (event: MessageEvent) => {
        const sseEvent: TypeSSEEvent = {
          data: JSON.parse(event.data),
          eventType: SSE_EVENT_TYPE_MSG,
        };
        subscriber.next(sseEvent);
      };

      /* subscribing for news events*/
      this.sseEventSource.addEventListener(
        SSE_EVENT_TYPE_NEWS,
        (event: MessageEvent) => {
          const sseEvent: TypeSSEEvent = {
            data: JSON.parse(event.data),
            eventType: SSE_EVENT_TYPE_NEWS,
          };
          subscriber.next(sseEvent);
        }
      );
    });
  }

  closeEventSourceForSSE() {
    if (this.sseEventSource) this.sseEventSource.close();
  }
}
