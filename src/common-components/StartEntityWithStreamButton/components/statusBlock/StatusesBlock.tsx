import React, { memo } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import DOMPurify from 'dompurify';

import { StatusBlock } from '../../styles';
import { StatusesPositionType } from '../../types';

type StatusBlockPropsType = {
  position: StatusesPositionType;
  allowPosition: 'top' | 'bottom';
  meetingCreatingStatus: string | null;
  createMeetingError: boolean;
  getShowStatusForStatusesBlock: (
    position: 'bottom' | 'top',
    statusPosition: StatusesPositionType,
    meetingCreatingStatus: boolean
  ) => boolean;
  maxWidth?: string;
};
export const StatusesBlock = memo(
  ({
    position,
    meetingCreatingStatus,
    getShowStatusForStatusesBlock,
    allowPosition,
    createMeetingError,
    maxWidth = '500px',
  }: StatusBlockPropsType) => {
    const sanitizedData = () => ({
      __html: DOMPurify.sanitize(
        meetingCreatingStatus ? meetingCreatingStatus : ''
      ),
    });

    return (
      <>
        {getShowStatusForStatusesBlock(
          allowPosition,
          position,
          !!meetingCreatingStatus
        ) && (
          <StatusBlock
            position={position}
            style={{
              color: createMeetingError ? 'red' : 'green',
              maxWidth: maxWidth,
            }}
          >
            <InfoIcon sx={{ marginRight: '10px' }} />
            <div dangerouslySetInnerHTML={sanitizedData()}></div>
          </StatusBlock>
        )}
      </>
    );
  }
);
