export type STREAM_OWNER_ACCEPTED_EventType = {
  data: {
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    userName: string;
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
      join_url: string;
    };
  };
  meta: {};
};
