import { useCallback, useEffect, useState } from 'react';

import { supportBookingAPI } from '../api';
import { useMeetingLogicParamsType, UseMeetingLogicReturnType } from '../types';

export const useMeetingLogic = (
  params: useMeetingLogicParamsType
): UseMeetingLogicReturnType => {
  const { selectedStream, updateStream } = params;

  const [settingsStreamStatusModal, setSettingsStreamStatusModal] =
    useState(false);
  const [meetingCreatingStatus, setMeetingCreatingStatus] = useState<
    string | null
  >(null);
  const [createMeeting, setCreateMeeting] = useState(false);
  const [createMeetingLoading, setCreateMeetingLoading] = useState(false);

  const changeMeetingLogicState = useCallback((fields: Record<string, any>) => {
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
  }, []);

  useEffect(() => {
    if (selectedStream.state) {
      supportBookingAPI.open().finally();
      supportBookingAPI.subscribe(
        'ZoomMeetingCreatingStatusChanged',
        ({ message }: { message: string }) => {
          changeMeetingLogicState({
            meetingCreatingStatus: message,
            createMeetingLoading: true,
          });
        }
      );
      supportBookingAPI.subscribe(
        'ZoomMeetingStarted',
        ({ url }: { url: string }) => {
          if (selectedStream.state) {
            const changedStream = {
              ...selectedStream.state,
              link: url,
            };

            selectedStream.set(changedStream);
            updateStream(changedStream).finally(() => {});
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
      if (selectedStream.state) {
        supportBookingAPI.close().finally();
        supportBookingAPI.unsubscribe('ZoomMeetingCreatingStatusChanged');
        supportBookingAPI.unsubscribe('ZoomMeetingStarted');
      }
    };
  }, [selectedStream.state]);

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
