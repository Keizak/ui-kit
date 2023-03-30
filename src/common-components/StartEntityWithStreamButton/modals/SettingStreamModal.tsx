import React from 'react';

import { BasicModal } from '../../../ui-components';
import { IStream } from '../api/api';

export type AddLinkToStreamModalPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedStream: IStream;
};
//TODO Добавить курсы и технологии
export const SettingStreamModal = (props: AddLinkToStreamModalPropsType) => {
  const { selectedStream } = props;

  return (
    <BasicModal
      width={1000}
      onClose={() => {
        props.setOpen(false);
      }}
      title={'Stream info'}
      open={props.open}
      customFooter={<></>}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>Стрим: {selectedStream.title}</span>
        <span>
          Zoom-meeting Url:{' '}
          <a href={selectedStream.link}>{selectedStream.link}</a>
        </span>
      </div>
    </BasicModal>
  );
};
