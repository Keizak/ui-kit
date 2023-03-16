import React from 'react';

import { BasicModal } from '../../../ui-components';
import { IStream } from '../api/api';

export type AddLinkToStreamModalPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedStream: IStream;
};
export const SettingStreamModal = (props: AddLinkToStreamModalPropsType) => {
  const { selectedStream } = props;

  return (
    <BasicModal
      onClose={() => {
        props.setOpen(false);
      }}
      title={'Stream settings'}
      open={props.open}
      customFooter={<></>}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        Zoom-meeting Url:{' '}
        <a href={selectedStream.link}>{selectedStream.link}</a>
      </div>
    </BasicModal>
  );
};
