import { useEffect, useState } from 'react';

import { IStream } from '../api/api';
import { supportBookingAPI } from '../api/supportBookingApi';

type useMeetingLogicParamsType = {
  selectedStream: IStream | null;
  setSelectedStream: (stream: IStream) => void;
  updateStream: (link: string, currentStream: IStream) => Promise<void>;
};

export type meetingLogicStateType = {
  createMeetingStatusModal: boolean;
  settingsStreamStatusModal: boolean;
  meetingCreatingStatus: string | null;
  createMeeting: boolean;
  createMeetingLoading: boolean;
};

export type meetingLogicStateKeysType = keyof meetingLogicStateType;
export const useMeetingLogic = (params: useMeetingLogicParamsType) => {
  const { selectedStream, setSelectedStream, updateStream } = params;

  const [meetingLogicState, setMeetingLogicState] =
    useState<meetingLogicStateType>({
      createMeetingStatusModal: false,
      settingsStreamStatusModal: false,
      meetingCreatingStatus: null,
      createMeeting: false,
      createMeetingLoading: false,
    });

  const changeMeetingLogicState = async (
    fields: meetingLogicStateKeysType | meetingLogicStateKeysType[],
    value: any
  ) => {
    const newState: any = { ...meetingLogicState };

    if (Array.isArray(fields)) {
      await fields.forEach((field, index) => (newState[field] = value[index]));
      setMeetingLogicState(newState);
    } else {
      setMeetingLogicState({ ...meetingLogicState, [fields]: value });
    }
  };

  useEffect(() => {
    supportBookingAPI.subscribe(
      'ZoomMeetingCreatingStatusChanged',
      ({ message }: { message: string }) => {
        changeMeetingLogicState(
          [
            'createMeetingStatusModal',
            'meetingCreatingStatus',
            'createMeetingLoading',
          ],
          [false, message, 'true']
        );
      }
    );
    supportBookingAPI.subscribe(
      'ZoomMeetingStarted',
      ({ url }: { url: string }) => {
        if (selectedStream) {
          setSelectedStream({ ...selectedStream, link: url });
          updateStream(url, selectedStream).finally();
        }
        changeMeetingLogicState(
          ['createMeeting', 'createMeetingLoading', 'createMeetingStatusModal'],
          [true, false, false]
        );
      }
    );

    return () => {
      supportBookingAPI.unsubscribe('ZoomMeetingCreatingStatusChanged');
      supportBookingAPI.unsubscribe('ZoomMeetingStarted');
    };
  }, [selectedStream]);

  return {
    changeMeetingLogicState,
    meetingLogicState,
  };
};
