import React, { memo, useMemo } from 'react';

import { getTitleCourseFromId } from '../../../../../helpers/common/getTitleCourseFromId';
import { BasicModal } from '../../../../../ui-components';
import { courseType, IStream, technologyType } from '../../../types';

export type AddLinkToStreamModalPropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedStream: IStream;
  courses?: courseType[];
  technologies?: technologyType[];
};
export const SettingStreamModal = memo(
  (props: AddLinkToStreamModalPropsType) => {
    const { selectedStream, courses = [], technologies = [] } = props;

    const coursesStrings = useMemo(
      () =>
        selectedStream.coursesLessonsRestrictions.map((el, index) => {
          return (
            <span key={el.courseId + 'course'}>
              {getTitleCourseFromId(el.courseId, courses)}
              {index + 1 !== selectedStream.coursesLessonsRestrictions.length &&
                ','}{' '}
            </span>
          );
        }),
      [selectedStream.coursesLessonsRestrictions]
    );

    const technologiesString = useMemo(
      () =>
        selectedStream.technologiesIds.map((id, index) => {
          return (
            <span key={id + 'technology'}>
              {getTitleCourseFromId(id, technologies)}
              {index + 1 !== selectedStream.technologiesIds.length && ','}{' '}
            </span>
          );
        }),
      [selectedStream.technologiesIds]
    );

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
          <span>
            <strong>Title of stream:</strong> {selectedStream.title}
          </span>
          <span>
            {' '}
            <strong>Courses:</strong> {coursesStrings}
          </span>
            {technologies.length > 0 &&  <span>
            {' '}
                <strong>Technologies:</strong> {technologiesString}
          </span>}

          <span>
            <strong>Zoom-meeting Url:</strong>{' '}
            <a href={selectedStream.link}>{selectedStream.link}</a>
          </span>
        </div>
      </BasicModal>
    );
  }
);
