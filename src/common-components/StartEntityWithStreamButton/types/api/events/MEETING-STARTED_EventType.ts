export type MEETING_STARTED_EventType = {
  data: {
    userEmail: null | string;
    userName: null | string;
    meeting: {
      streamId: null | string;
      zoomAccEmail: null | string;
      zoomAccJoinUrl: null | string;
      registration_url: null | string;
      streamOwnerJoin_url: null | string;
      streamOwnerName: null | string;
      streamOwnerTelegramId: null | number;
      streamOwnerLastName: null | string;
      streamOwnerEmail: null | string;
      streamTopic: null | string;
    };
  };
  meta: {};
};
