import React from 'react';

import { Button } from '@mui/material';

import { BasicTextField } from '../../../../../ui-components/BasicTextField/BasicTextField';
import { IStream } from '../../../types';

type AddLinkInputPropsType = {
  autoGenerateLink: boolean;
  selectedStream: IStream;
  setSelectedStream: (selectedStream: IStream) => void;
};

export const AddLinkInput = ({
  autoGenerateLink,
  selectedStream,
  setSelectedStream,
}: AddLinkInputPropsType) => {
  const readDataFromBuffer = () => {
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((item) => {
        setSelectedStream({ ...selectedStream, link: item });
      });
    } else {
      alert('Поддержки нет! Скопируй вручную.');
    }
  };

  return !autoGenerateLink ? (
    <div>
      <BasicTextField
        onChange={(_event, value) =>
          setSelectedStream({ ...selectedStream, link: value.toString() })
        }
        value={selectedStream.link}
      />
      <Button
        size="small"
        color="primary"
        style={{ marginLeft: '5px' }}
        onClick={readDataFromBuffer}
      >
        add link from buffer
      </Button>
    </div>
  ) : (
    <></>
  );
};
