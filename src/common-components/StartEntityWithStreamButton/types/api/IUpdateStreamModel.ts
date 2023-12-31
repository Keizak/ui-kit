import { ICourseIdLessonIdVideoStreamRestrictionUpdateModel } from './ICourseIdLessonIdVideoStreamRestrictionUpdateModel';
import { StreamTypes } from './StreamTypes';

export interface IUpdateStreamModel {
  autogenerated: boolean;
  title: string;
  link: string;
  userId: number | null;
  userName: string;
  type: StreamTypes;
  technologiesIds: number[];
  coursesLessonsRestrictions: ICourseIdLessonIdVideoStreamRestrictionUpdateModel[];
  samuraiHubLessonId: string;
}
