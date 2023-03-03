import React, { useEffect, useState } from 'react';

import { Checkbox } from '@mui/material';
import { useMutation } from 'react-query';

import { BasicModal, BasicSelect } from '../../../ui-components';
import { IStream, streamsAPI } from '../api/api';

import { AddLinkInput } from './common/AddLinkInput';

export type AddLinkToStreamModalPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (streamId: number, status: boolean) => void;
  streams: IStream[];
  setStreamStatus: (value: boolean) => void;
  setMeetingCreatingStatus: (value: string) => void;
  selectedStream: IStream | null;
  setSelectedStream: (value: IStream | null) => void;
};
export const CreateSettingStreamModal = (
  props: AddLinkToStreamModalPropsType
) => {
  const [autoGenerateLink, setAutoGenerateLink] = useState<boolean>(false);

  const { selectedStream, setSelectedStream } = props;

  const onSubmitDisabled = () => {
    if (autoGenerateLink) return false;
    else return !selectedStream?.link;
  };

  const createMeeting = useMutation<any, any, {}, any>(
    () => {
      if (selectedStream) return streamsAPI.createMeeting(selectedStream.id);
      else return new Promise((resolve) => resolve(null));
    },
    {
      onSuccess: (data) => {
        props.setMeetingCreatingStatus(data.messages[0]);
      },
    }
  );

  const startStreamHandler = () => {
    if (autoGenerateLink)
      createMeeting.mutateAsync({}).finally(() => props.setOpen(false));
    else
      selectedStream &&
        props.onSubmit(
          selectedStream.id,
          !!selectedStream.startedStreamSession
        );
  };

  const displayOptions = props.streams.map((stream: IStream) => ({
    title: stream.title,
    value: stream.id,
  }));

  const selectStream = (value: number) => {
    const stream = props.streams.find((stream: IStream) => stream.id === value);

    setSelectedStream(stream as IStream);
  };

  useEffect(() => {
    if (selectedStream?.startedStreamSession) {
      props.setStreamStatus(true);
    }
  }, [selectedStream]);

  return (
    <BasicModal
      onClose={() => {
        props.setOpen(false);
      }}
      onSubmit={startStreamHandler}
      title={'Stream settings'}
      onSubmitText={'Start stream'}
      submitDisabled={onSubmitDisabled()}
      open={props.open}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <BasicSelect
          options={displayOptions}
          onSelect={selectStream}
          value={selectedStream ? selectedStream.id : ''}
        />

        {selectedStream && (
          <div>
            <AddLinkInput
              autoGenerateLink={autoGenerateLink}
              selectedStream={selectedStream}
              setSelectedStream={setSelectedStream}
            />
            <span>
              ZoomService
              <Checkbox
                checked={autoGenerateLink}
                onChange={() => setAutoGenerateLink(!autoGenerateLink)}
              />
            </span>
          </div>
        )}
      </div>
    </BasicModal>
  );
};
