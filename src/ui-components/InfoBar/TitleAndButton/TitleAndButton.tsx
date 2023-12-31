import React, { ReactNode } from 'react';

import { Block, Text } from '../../../ui-styled-components';
import { BasicButton } from '../../BasicButton/BasicButton';

type TitleAndButtonPropsType = {
  title: ReactNode;
  buttonText: string | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
/**
 * JSX Component( TitleAndButton )
 * Отображает текст и кнопку, если для кнопки был получен текст
 * Текст слева, кнопку справа
 * Принимает пропсы :
 * @param {string} props.title - заголовок ( обязательный )
 * @param {string} props.buttonText - текст на кнопке . Если текста нету , не будет и кнопки  ( необязательный )
 */
export const TitleAndButton = (props: TitleAndButtonPropsType) => {
  return (
    <Block
      name={'Title and button'}
      width={'100%'}
      justifyContent={'space-between'}
    >
      <Text fontWeight={'700'} fontSize={'22px'}>
        {props.title}
      </Text>
      {props.buttonText ? (
        <BasicButton
          mode={'red'}
          text={props.buttonText}
          onClick={(e) => props.onClick(e)}
        />
      ) : (
        <Block name={'Empty Block'} />
      )}
    </Block>
  );
};
