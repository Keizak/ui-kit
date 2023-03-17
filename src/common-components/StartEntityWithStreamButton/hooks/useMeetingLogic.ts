import { useEffect, useState } from 'react';

import { IStream } from '../api/api';
import { supportBookingAPI } from '../api/supportBookingApi';

type useMeetingLogicParamsType = {
  selectedStream: IStream | null;
  setSelectedStream: (stream: IStream) => void;
  updateStream: (newStream: IStream) => Promise<void>;
};

export type meetingLogicStateType = {
  createMeetingStatusModal: boolean;
  settingsStreamStatusModal: boolean;
  meetingCreatingStatus: string | null;
  createMeeting: boolean;
  createMeetingLoading: boolean;
};

export const useMeetingLogic = (params: useMeetingLogicParamsType) => {
  const { selectedStream, setSelectedStream, updateStream } = params;

  const [settingsStreamStatusModal, setSettingsStreamStatusModal] =
    useState(false);
  const [meetingCreatingStatus, setMeetingCreatingStatus] = useState<
    string | null
  >(null);
  const [createMeeting, setCreateMeeting] = useState(false);
  const [createMeetingLoading, setCreateMeetingLoading] = useState(false);

  const changeMeetingLogicState = (fields: Record<string, any>) => {
    Object.keys(fields).forEach((key) => {
      switch (key) {
        case 'settingsStreamStatusModal':
          return setSettingsStreamStatusModal(fields[key]);
        case 'meetingCreatingStatus':
          return setMeetingCreatingStatus(fields[key]);
        case 'createMeeting':
          return setCreateMeeting(fields[key]);
        case 'createMeetingLoading':
          return setCreateMeetingLoading(fields[key]);
        default:
          break;
      }
    });
  };

  useEffect(() => {
    if (selectedStream) {
      supportBookingAPI.open().finally();
      supportBookingAPI.subscribe(
        'ZoomMeetingCreatingStatusChanged',
        ({ message }: { message: string }) => {
          console.log(message, '-message');
          changeMeetingLogicState({
            meetingCreatingStatus: message,
            createMeetingLoading: true,
          });
        }
      );
      supportBookingAPI.subscribe(
        'ZoomMeetingStarted',
        ({ url }: { url: string }) => {
          if (selectedStream) {
            const changedStream = { ...selectedStream, link: url };

            setSelectedStream(changedStream);
            updateStream(changedStream).finally();
          }
          changeMeetingLogicState({
            createMeeting: true,
            createMeetingLoading: false,
            meetingCreatingStatus: '',
          });
        }
      );
    }

    return () => {
      if (selectedStream) {
        supportBookingAPI.close().finally();
        supportBookingAPI.unsubscribe('ZoomMeetingCreatingStatusChanged');
        supportBookingAPI.unsubscribe('ZoomMeetingStarted');
      }
    };
  }, [selectedStream]);

  return {
    changeMeetingLogicState,
    meetingLogicState: {
      settingsStreamStatusModal,
      meetingCreatingStatus,
      createMeetingLoading,
      createMeeting,
    },
  };
};
