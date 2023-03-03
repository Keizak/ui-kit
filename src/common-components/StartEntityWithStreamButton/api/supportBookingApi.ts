import * as signalR from '@microsoft/signalr';

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
}

export const supportBookingAPI = new SupportBookingAPI();
