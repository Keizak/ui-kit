import { courseType } from '../courseType';
import { technologyType } from '../technologyType';

export type createStreamButtonModalsPropsType = {
  selectedStream: any;
  meetingLogicState: any;
  changeMeetingLogicState: any;
  handlers: any;
  actionConfirmationData: any;
  courses?: courseType[];
  technologies?: technologyType[];
  entityTitle?: string;
};
