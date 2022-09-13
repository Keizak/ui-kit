import React from 'react';

import { Block, Text } from '../../ui-styled-components/common';
import { BasicButton } from '../BasicButton/BasicButton';
import { BasicSelect } from '../BasicSelect/BasicSelect';
import { LogoutSVG } from '../Svg/LogoutSvg';
import { MenuBaraSvg } from '../Svg/MenuBaraSvg';

/**
 * JSX Component ( NavBar )
 * Всегда отрисовывается сверху сайта
 * Не примает никакиз пропсов
 */
export const NavBar = () => {
  const name = 'Елизавета Спивак';
  const selectOptions = ['Front-end', 'Back-End'];

  return (
    <Block
      name={'NavBarContainer'}
      width={'100vw'}
      minHeight={'60px'}
      background={'#FCFCFC'}
      boxShadow={
        '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)'
      }
    >
      <Block
        name={'ContentContainer'}
        width={'90vw'}
        justifyContent={'space-between'}
      >
        <Block
          name={'LeftHalf'}
          justifyContent={'flex-start'}
          margin={'10px 10px 10px 0'}
        >
          <MenuBaraSvg />
        </Block>
        <Block
          name={'RightHalf'}
          justifyContent={'flex-start'}
          width={'fit-content'}
        >
          <Block
            name={'SelectItem'}
            width={'250px'}
            justifyContent={'flex-start'}
            margin={'10px 40px 10px 0'}
          >
            <BasicSelect
              label={'Name course'}
              options={selectOptions}
              onSelect={() => {}}
            />
          </Block>
          <Block name={'NameItem'} margin={'10px 30px 10px 0'}>
            <Text fontSize={'16px'}>{name}</Text>
          </Block>
          <BasicButton mode={'normal'} icon={<LogoutSVG />} text={'Sign out'} />
        </Block>
      </Block>
    </Block>
  );
};
