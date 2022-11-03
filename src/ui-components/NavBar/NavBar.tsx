import React, { useEffect, useState } from 'react';

import { Block, Text } from '../../ui-styled-components/common';
import { BasicButton } from '../BasicButton/BasicButton';
import { BasicSelect } from '../BasicSelect/BasicSelect';
import { LogoutSVG } from '../Svg/LogoutSvg';
import { MenuBaraSvg } from '../Svg/MenuBaraSvg';

type NavBarPropsType = {
  selectOptions?: string[];
  userName?: string;
  onSelect: (value: string) => void;
  currentCourse: string | boolean;
  menuClick?: Function;
  logout?: () => void;
};
/**
 * JSX Component ( NavBar )
 * Всегда отрисовывается сверху сайта
 * Не примает никакиз пропсов
 */
export const NavBar = (props: NavBarPropsType) => {
  const name = props.userName || 'Елизавета Спивак';
  const selectOptions = props.selectOptions || ['Front-end', 'Back-End'];
  const [currentCourse, setCurrentCourse] = useState(
    props.currentCourse ? props.currentCourse : selectOptions[0]
  );
  const localstorageKey = 'it-incubator-course';

  const onSelectHandler = (value: string) => {
    props.onSelect && props.onSelect(value);
    setCurrentCourse(value.toString());
    sessionStorage.setItem(localstorageKey, value);
  };

  useEffect(() => {
    const localCurrentCourse = sessionStorage.getItem(localstorageKey);

    if (localCurrentCourse) {
      setCurrentCourse(localCurrentCourse);
    }
  }, []);

  useEffect(() => {
    props.onSelect(currentCourse.toString());
  }, [currentCourse]);

  return (
    <Block
      name={'NavBarContainer'}
      minHeight={'60px'}
      background={'#FCFCFC'}
      margin={'0 0 5px 0'}
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
          onClick={() => props.menuClick && props.menuClick()}
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
              label={currentCourse.toString()}
              options={selectOptions}
              onSelect={onSelectHandler}
            />
          </Block>
          <Block name={'NameItem'} margin={'10px 30px 10px 0'}>
            <Text fontSize={'16px'}>{name}</Text>
          </Block>
          <BasicButton
            mode={'normal'}
            icon={<LogoutSVG />}
            text={'Sign out'}
            onClick={() => props.logout && props.logout()}
          />
        </Block>
      </Block>
    </Block>
  );
};
