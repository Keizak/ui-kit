import React, { ReactNode } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogProps,
  Grid,
  IconButton,
  SxProps,
  useTheme,
} from '@mui/material';

import { Block } from '../../ui-styled-components/common';
import { BasicButton } from '../BasicButton/BasicButton';

export type BasicModalPropsType = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;
  mainContentStyle?: SxProps;
  titleStyle?: SxProps;
  dialogProps?: DialogProps;
  onCancel?: () => void;
  onCancelText?: string;
  onSubmit?: () => void;
  onSubmitText?: string;
  customFooter?: ReactNode;
};
/**
 * JSX Component( BasicModal )
 * Принимает пропсы :
 * @param {string} example
 * @param {boolean} props.open параметр отвечающий за открытие модалки ( Обязательный )
 * @param {() => void} props.onClose функция выполняющая логику по закрытию модалки ( Обязательный )
 * @param {() => void} props.onCancel функция выполняющая логику по нажатию кнопки Cancel( Left bottom ) ( Необязательный )
 * @param {() => void} props.onSubmit функция выполняющая логику по нажатию кнопки Submit( Right bottom ) ( Необязательный )
 * @param {string} props.title Имя модалки ( Обязательный )
 * @param {React.ReactNode} props.children Контет отображающий внутри шаблона модального окна ( Обязательный )
 * @param {number} props.width ширина модального окна ( Необязательный )
 * @param {SxProps} props.mainContentStyle стиль основного контента ( Необязательный )
 * @param {SxProps} props.titleStyle стиль заголовка модальногоо окна ( Необязательный )
 * @param {DialogProps} props.dialogProps более гибкая натсройка модального окна ( Необязательный )
 * @param {string} props.onCancelText Текст для кнопки отмены по дефолту = Cancel
 * @param {string} props.onSubmitText Текст для кнопки потверждения по дефолту = Submit
 * @param {string} props.customFooter Можно передать свой кастомный футер для модалки,
 * тогда пропсы ( onSubmitText,onSubmit,onCancelText,onCancel) становяться не актуальны
 */
export const BasicModal = ({
  open,
  onClose,
  title,
  children,
  width,
  mainContentStyle,
  titleStyle,
  dialogProps,
  onCancel,
  onSubmit,
  onCancelText = 'Cancel',
  onSubmitText = 'Submit',
  customFooter,
}: BasicModalPropsType) => {
  //----------------------------------------Инициализуем значения---------------------------------------------

  // инициализируем значения относящиейся к стилям и общей теме
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const style = mainContentStyle
    ? mainContentStyle
    : {
        width: width || 500,
        boxShadow: 24,
        position: 'relative',
      };
  const defaultTitleStyle = titleStyle
    ? titleStyle
    : {
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '21px',
      };

  //----------------------------------------Дополнительные функции---------------------------------------------

  /**
     функция обрабатывает нажатие на кнопку отмены
     выполняет внутренею логику по закрытию модалки  в дополнение может выполонрить логику переданную в пропсах
     комопненте под именем onCansel
     */
  const cancelHandler = () => {
    onCancel && onCancel();
    onClose();
  };

  /**
     функция обрабатывает нажатие на кнопку сабмитв
     выполняет внутренею логику по закрытию модалки  в дополнение может выполонрить логику переданную в пропсах
     комопненте под именем onSubmit
     */
  const submitHandler = () => {
    onSubmit && onSubmit();
    onClose();
  };

  //----------------------------------------------JSX----------------------------------------------------------

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: isDarkTheme ? '#182636' : '#FFFFFF',
          backgroundImage: 'none',
          maxWidth: '100%',
        },
      }}
      {...dialogProps}
    >
      <Box sx={style}>
        <Grid
          container
          direction="row"
          justifyContent={'space-between'}
          alignItems={'center'}
          style={{
            padding: '0 24px',
            height: '60px',
            borderBottom: isDarkTheme
              ? '1px solid rgba(0, 0, 0, 0.1)'
              : '1px solid #E5E5E5',
          }}
        >
          <Box sx={defaultTitleStyle}>
            <strong>{title}</strong>
          </Box>
          <Box justifyContent="center" alignItems="center" display="flex">
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid style={{ padding: '15px 24px 15px 24px', overflow: 'auto' }}>
          {children}
        </Grid>
        {customFooter ? (
          customFooter
        ) : (
          <Block
            name={'Buttons'}
            padding={'24px'}
            justifyContent={'space-between'}
          >
            <BasicButton
              mode={'normal'}
              text={onCancelText}
              onClick={cancelHandler}
            />
            <BasicButton
              mode={'red'}
              text={onSubmitText}
              onClick={submitHandler}
            />
          </Block>
        )}
      </Box>
    </Dialog>
  );
};
