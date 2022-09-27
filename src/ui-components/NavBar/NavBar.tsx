import React, {useState} from 'react';

import { Block, Text } from '../../ui-styled-components/common';
import { BasicButton } from '../BasicButton/BasicButton';
import { BasicSelect } from '../BasicSelect/BasicSelect';
import { LogoutSVG } from '../Svg/LogoutSvg';
import { MenuBaraSvg } from '../Svg/MenuBaraSvg';


type NavBarPropsType = {
  selectOptions? : string []
  userName?: string
  onSelect: (value:string) => void
}
/**
 * JSX Component ( NavBar )
 * Всегда отрисовывается сверху сайта
 * Не примает никакиз пропсов
 */
export const NavBar = (props:NavBarPropsType) => {
  const name = props.userName || 'Елизавета Спивак';
  const selectOptions = props.selectOptions || ['Front-end', 'Back-End'];
  const [currentCourse,setCurrentCourse] = useState(selectOptions[0])

  const onSelectHandler = (value:string | number) => {
    props.onSelect && props.onSelect
    setCurrentCourse(value.toString())
    console.log(currentCourse,"-selected")
  }

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
              onSelect={onSelectHandler}
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
