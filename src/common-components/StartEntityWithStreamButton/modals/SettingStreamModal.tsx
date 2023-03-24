import React from 'react';

import { BasicModal } from '../../../ui-components';
import { IStream } from '../api/api';

import { AddLinkInput } from './common/AddLinkInput';

export type AddLinkToStreamModalPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => void;

  selectedStream: IStream;
  setSelectedStream: (value: IStream | null) => void;
};
export const SettingStreamModal = (props: AddLinkToStreamModalPropsType) => {
  const { selectedStream, setSelectedStream } = props;

  return (
    <BasicModal
      onClose={() => {
        props.setOpen(false);
      }}
      onSubmit={() => props.onSubmit()}
      title={'Stream settings'}
      onSubmitText={'Update'}
      submitDisabled={!selectedStream?.link}
      open={props.open}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AddLinkInput
          autoGenerateLink={false}
          selectedStream={selectedStream}
          setSelectedStream={setSelectedStream}
        />
      </div>
    </BasicModal>
  );
};
