import * as signalR from '@microsoft/signalr';

import { securityConstants } from '../../../constants/securityConstants';

export type SupportEvents =
  | 'StartSupport'
  | 'StudentAccepted'
  | 'QueueItemAdded'
  | 'QueueItemCancelled'
  | 'NoteUpdated'
  | 'ZoomMeetingCreatingStatusChanged'
  | 'ZoomMeetingStarted'
  | 'StopSupport';

class SupportBookingAPI {
  connection: signalR.HubConnection | null = null;
  wsStatus: 'pending' | 'connected' | 'error' = 'pending';
  private eventsNames: string[] = [];

  subscribe(eventName: SupportEvents, callback: (...args: any) => void) {
    this.eventsNames.push(eventName);
    this.connection?.on(eventName, function (...args: any) {
      callback(...args);
    });
  }

  unsubscribe(...eventNames: SupportEvents[]) {
    this.eventsNames = this.eventsNames.filter((e) =>
      eventNames.every((en) => en !== e)
    );
    eventNames.forEach((e) => {
      this.connection?.off(e);
    });
  }

  async open() {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(
          securityConstants.apiBaseUrl.replace('api/', 'support-booking-hub')
        ) //todo: add configuration
        .withAutomaticReconnect()
        .build();
    }
    await this.connection.start();
    this.wsStatus = 'connected';

    return true;
  }

  async close() {
    if (this.connection) {
      this.eventsNames.forEach((e) => this.connection?.off(e));
      this.eventsNames = [];
      await this.connection.stop();
    }
  }
}

export const supportBookingAPI = new SupportBookingAPI();
