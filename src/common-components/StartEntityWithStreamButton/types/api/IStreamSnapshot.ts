import { ICourseIdLessonIdStreamRestriction } from './ICourseIdLessonIdStreamRestriction';
import { StreamTypes } from './StreamTypes';

export interface IStreamSnapshot {
  title: string;
  userId: number;
  userFullName: string;
  type: StreamTypes;
  courses: ICourseIdLessonIdStreamRestriction[];
  technoligiesIds: number[];
}
