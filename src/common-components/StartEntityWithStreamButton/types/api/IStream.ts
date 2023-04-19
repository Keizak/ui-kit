import { IBaseEntity } from './APIBaseEntity';
import { ICourseIdLessonIdVideoStreamRestriction } from './ICourseIdLessonIdVideoStreamRestriction';
import { IStreamSession } from './IStreamSession';
import { StreamStatusType } from './StreamStatusType';
import { StreamTypes } from './StreamTypes';

export interface IStream extends IBaseEntity {
  autogenerated: boolean;
  title: string;
  samuraiHubLessonId: string;
  link: string;
  userId: number | null;
  type: StreamTypes;
  technologiesIds: number[];
  status: StreamStatusType;
  userName: string;
  nextSessionCode: string;
  coursesLessonsRestrictions: ICourseIdLessonIdVideoStreamRestriction[];
  startedStreamSession: IStreamSession | boolean;
}
