import React, { memo } from 'react';

import InfoIcon from '@mui/icons-material/Info';

import { StatusBlock } from '../../styles';
import { StatusesPositionType } from '../../types';

type StatusBlockPropsType = {
  position: StatusesPositionType;
  allowPosition: 'top' | 'bottom';
  meetingCreatingStatus: string | null;
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
  }: StatusBlockPropsType) => {
    return (
      <>
        {getShowStatusForStatusesBlock(
          allowPosition,
          position,
          !!meetingCreatingStatus
        ) && (
          <StatusBlock position={position}>
            <InfoIcon sx={{ marginRight: '10px' }} />
            {meetingCreatingStatus}
          </StatusBlock>
        )}
      </>
    );
  }
);
