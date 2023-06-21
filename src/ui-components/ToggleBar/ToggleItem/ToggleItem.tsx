import React, { MouseEventHandler } from 'react';

import { nanoid } from 'nanoid';

import { Block, Text } from '../../../ui-styled-components';

type ToggleItemPropsType = {
  title: string;
  active: boolean;
  width?: string;
  height?: string;
  flexGrow?: number;
  onClick: MouseEventHandler;
};
/**
 * JSX Component( ToggleItem )
 * Надпись подчеркивающаяся снизу линией , цвета зависящего от текущего выбора
 * Та надпись на которую выпал выбор будет подсвечиваться голубоватым цветом.
 * Неактивная запись будет подсвечиваться серым
 * Принимает пропсы :
 * @param {string} props.title назвагие выбора
 * @param {boolean} props.active меняет цвета в зависимости от значения #366EFF - true , #A6A295 - false
 * @param {string} props.width Ширина таба
 * @param {string} props.height Высоат таба
 * @param {number} props.flexGrow flexGrow
 * @param {MouseEventHandler} props.onClick Обработчик клика
 */
export const ToggleItem = (props: ToggleItemPropsType) => {
  const {width = "100%",height = "60px",flexGrow=1} = props
  const color = props.active ? '#366EFF' : '#A6A295';

  return (
    <Block
      name={'Toggle item'}
      width={width}
      height={height}
      borderBottom={`2px solid ${color}`}
      flexGrow={flexGrow}
      {...props}
      cursor={'pointer'}
      key={nanoid()}
    >
      <Text color={color}>{props.title}</Text>
    </Block>
  );
};
