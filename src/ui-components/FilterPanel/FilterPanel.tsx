import React from 'react';

import { Block } from '../../ui-styled-components';
import { BasicInput } from '../BasicInput/BasicInput';
import { BasicObsoleteSelect } from '../BasicObsoleteSelect/BasicObsoleteSelect';

export type FilterPanelPropsType = {
  firstSelectLabel: string;
  firstSelectOnSelect: (value: string | number) => void;
  firstSelectOptions: Array<string | number>;
  secondSelectLabel: string;
  secondSelectOnSelect: (value: string | number) => void;
  secondSelectOptions: Array<string | number>;
  inputPlaceholder: string;
  inputOnChange: (value: string) => void;
  inputValue: string;
};
/**
 * JSX Component( FilterPanel )
 * Принимает пропсы :
 * @param {string} props.firstSelectLabel имя первого селектора ( Обязательный )
 * @param {(value:string | number) => void} props.firstSelectOnSelect функция обработчик выбора значения первого селектора ( Обязательный )
 * @param { Array<string | number>} props.firstSelectOptions массив данных для первого селектора ( Обязательный )
 * @param {string} props.secondSelectLabel имя второго селектора ( Обязательный )
 * @param { (value:string | number) => void} props.secondSelectOnSelect функция обработчик выбора значения второго селектора ( Обязательный )
 * @param {Array<string | number>} props.secondSelectOptions массив данных для второго селектора ( Обязательный )
 * @param {string} props.inputPlaceholder полпрозрачное значение на инпуте без введеного текста ( Обязательный )
 * @param {(value:string) => void} props.inputOnChange функция обработчик измененния значения инпута ( Обязательный )
 * @param {string} props.inputValue функция обработчик измененния значения инпута ( Обязательный )
 */
export const FilterPanel = (props: FilterPanelPropsType) => {
  //--------------------------------------------Инициализируем переменные--------------------------------------------

  /**
   * Обозначаем общие параметры пропсов для более легкой передачи в компоненты
   */
  const commonSelectStyle = {
    margin: '0 24px 0 0',
    minWidth: '17%',
  };

  //-----------------------------------------------JSX-----------------------------------------------

  return (
    <Block
      name={'Filter Panel'}
      width={'100%'}
      margin={'24px 0 0 0'}
      justifyContent={'space-between'}
    >
      <BasicObsoleteSelect
        label={props.firstSelectLabel}
        options={props.firstSelectOptions}
        onSelect={props.firstSelectOnSelect}
        {...commonSelectStyle}
      />
      <BasicObsoleteSelect
        label={props.secondSelectLabel}
        options={props.secondSelectOptions}
        onSelect={props.secondSelectOnSelect}
        {...commonSelectStyle}
      />
      <BasicInput
        mode={'search'}
        placeholder={props.inputPlaceholder}
        sx={{ width: '60%' }}
        onChange={props.inputOnChange}
        value={props.inputValue}
      />
    </Block>
  );
};
