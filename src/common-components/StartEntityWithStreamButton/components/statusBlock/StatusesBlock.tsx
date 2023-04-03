import React, { memo } from 'react';

import InfoIcon from '@mui/icons-material/Info';

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
};
export const StatusesBlock = memo(
  ({
    position,
    meetingCreatingStatus,
    getShowStatusForStatusesBlock,
    allowPosition,
    createMeetingError,
  }: StatusBlockPropsType) => {
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
            }}
          >
            <InfoIcon sx={{ marginRight: '10px' }} />
            {meetingCreatingStatus}
          </StatusBlock>
        )}
      </>
    );
  }
);
