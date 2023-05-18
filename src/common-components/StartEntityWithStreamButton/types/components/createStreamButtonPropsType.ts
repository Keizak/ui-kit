import { CSSProperties } from 'react';

import { RequestStatuses } from '../../../../helpers';
import { IStream, StreamTypes } from '../api';
import { courseType } from '../courseType';
import { StatusesPositionType } from '../hooks';
import { technologyType } from '../technologyType';

export type createStreamButtonPropsType = {
  title?: string;
  entityTitle?: string;
  type: StreamTypes | StreamTypes[];
  userId: number;
  requestStatus: RequestStatuses;
  customButtonStyle?: CSSProperties;
  customButtonClassname: string;
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;

  courses?: courseType[];
  technologies?: technologyType[];

  statusPosition?: StatusesPositionType;

  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;

  beforeStartStream?: (
    selectedStream: IStream,
    set: (stream: IStream) => void
  ) => Promise<any>;

  statusMaxWidth?: string;

  withNameOfStream?: boolean;
  entityId?: string | number | null;
};
