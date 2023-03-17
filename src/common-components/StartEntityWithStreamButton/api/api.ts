import { securityConstants } from '../../../constants/securityConstants';
import { BaseAPI } from '../../../helpers';
import { BaseAxiosInstance } from '../../../helpers/api/baseAxiosInstance/BaseAxiosInstance';
export enum ActionResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export interface IActionResult<T = {}> {
  data: T;
  messages: string[];
  resultCode: ActionResultCodes;
}
export interface IBaseEntity {
  id: number;
  addedAt: string; // ISO date string
  addedBy: number | null;
  updatedAt: string; // ISO date string
}

export interface ICourseIdLessonIdStreamRestriction {
  courseId: number;
  minLessonId: number;
}

export interface IStreamSnapshot {
  title: string;
  userId: number;
  userFullName: string;
  type: StreamTypes;
  courses: ICourseIdLessonIdStreamRestriction[];
  technoligiesIds: number[];
}
export interface IStreamSession extends IBaseEntity {
  streamSnapshot: IStreamSnapshot;
  status: StreamStatusType;
  startDate: string;
  stopDate: string | null;
  videoStreamId: number;
  code: string;
}
export enum StreamTypes {
  Obsolete_ReactSupport = 0,
  Obsolete_JSSupport = 1,
  Obsolete_HtmlSupportForFrontend = 2,
  Obsolete_MainReactLesson = 3,
  Obsolete_JSLesson = 4,
  TestItemReview = 5,
  InterviewTraining = 6,
  Obsolete_MainHtmlLesson = 7,
  Obsolete_HtmlSupportForHtml = 8,

  Support = 9,
  MainLesson = 10,
  ExtraLesson = 11,
  OnlineCoworking = 20,

  OtherStream = 30,
}

export interface ICourseIdLessonIdVideoStreamRestrictionUpdateModel {
  courseId: number;
  lessonId: number | null;
}

export interface ICourseIdLessonIdVideoStreamRestriction {
  courseId: number;
  lessonId: number | null;
  courseTitle: string;
  lessonTitle: string;
}

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

export enum StreamStatusType {
  Stopped = 0,
  Started = 1,
}

export const axiosInstance = new BaseAxiosInstance({
  baseURL: `${securityConstants.apiBaseUrl}`,
  withCredentials: true,
  headers: {
    't-bot-url': securityConstants.botUrl,
  },
}).AxiosInstanceClient;

class StreamAPI extends BaseAPI<IUpdateStreamModel, IStream> {
  stop(streamId: number) {
    return this.anyPut<IActionResult<null>>(`${streamId}/stop`);
  }

  start(streamId: number): Promise<IActionResult<null>> {
    return this.anyPut<IActionResult<null>>(`${streamId}/start`);
  }

  createMeeting(streamId: number): Promise<IActionResult<{}>> {
    return this.anyPost(`${streamId}/zoom-meeting`);
  }
}

export const streamsAPI = new StreamAPI(axiosInstance, `streams`);
