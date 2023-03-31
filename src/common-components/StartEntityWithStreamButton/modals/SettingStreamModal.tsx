import React from 'react';

import { getTitleCourseFromId } from '../../../helpers/common/getTitleCourseFromId';
import { BasicModal } from '../../../ui-components';
import { IStream } from '../api/api';
import { courseType, technologyType } from '../createStreamButton';

export type AddLinkToStreamModalPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedStream: IStream;
  courses?: courseType[];
  technologies?: technologyType[];
};
//TODO Добавить курсы и технологии
export const SettingStreamModal = (props: AddLinkToStreamModalPropsType) => {
  const { selectedStream, courses = [], technologies = [] } = props;

  const coursesStrings = selectedStream.coursesLessonsRestrictions.map((el) => {
    return <span>{getTitleCourseFromId(el.courseId, courses)},</span>;
  });

  const technologiesString = selectedStream.technologiesIds.map((id) => {
    return <span>{getTitleCourseFromId(id, technologies)},</span>;
  });

  return (
    <BasicModal
      width={1000}
      onClose={() => {
        props.setOpen(false);
      }}
      title={'Stream info'}
      open={props.open}
      customFooter={<></>}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>Title of stream: {selectedStream.title}</span>
        <span>Courses: {coursesStrings}</span>
        <span>Technologies: {technologiesString}</span>
        <span>
          Zoom-meeting Url:{' '}
          <a href={selectedStream.link}>{selectedStream.link}</a>
        </span>
      </div>
    </BasicModal>
  );
};
