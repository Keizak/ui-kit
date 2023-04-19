import React, { memo } from 'react';

import { createStreamButtonModalsPropsType } from '../../types';

import { ActionConfirmationModal } from './ActionConfirmationModal/ActionConfirmationModal';
import { SettingStreamModal } from './SettingStreamModal/SettingStreamModal';

export const CreateStreamButtonModals = memo(
  ({
    selectedStream,
    meetingLogicState,
    changeMeetingLogicState,
    courses,
    technologies,
    actionConfirmationData,
    entityTitle,
    handlers,
  }: createStreamButtonModalsPropsType) => {
    return (
      <>
        {selectedStream.state && (
          <SettingStreamModal
            open={meetingLogicState.settingsStreamStatusModal}
            setOpen={(value) =>
              changeMeetingLogicState({ settingsStreamStatusModal: value })
            }
            selectedStream={selectedStream.state}
            courses={courses}
            technologies={technologies}
          />
        )}
        <ActionConfirmationModal
          currentAction={actionConfirmationData.currentAction}
          title={`${actionConfirmationData.currentAction} ${entityTitle}`}
          onConfirm={() =>
            handlers.actionConfirmationHandler(
              actionConfirmationData.currentAction
            )
          }
          content={handlers.chooseText(
            actionConfirmationData.currentAction,
            entityTitle
          )}
          open={actionConfirmationData.actionConfirmationStatus.state}
          setOpen={actionConfirmationData.actionConfirmationStatus.set}
        />
      </>
    );
  }
);
