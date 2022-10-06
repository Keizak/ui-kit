import React from 'react';

import { DefaultTheme } from 'styled-components';

import { BasicSelect } from '../../BasicSelect/BasicSelect';

export type CronSelectType = {
  options: (string | number)[];
  multiple: boolean;
  value: string | string[];
  onSelect: (value: string) => void;
  theme?: DefaultTheme;
  label: string;
  menuType?: 'vertical' | 'horizontal';
};
/**
 * JSX Component ( CronSelect )
 * Базовый селектор с минимаьным настройками подходящими для отображения в CronComponent
 * Принимает следующие пропсы
 * @param {( string | number) []} options - Параметры для выбора ( обязательный )
 * @param {boolean} multiple - Режим выбора мгожественного значения ( обязательный )
 * @param {( string | number) []} value - Текущие значение инпута ( обязательный )
 * @param {(value: string) => void} onSelect - функция выполняемая при выборе значения ( обязательный )
 * @param {DefaultTheme} theme - Тема для кастомизации классов material ui ( необязательный )
 * @param {string} label - Название селектора ( обязательный )
 * @param {'vertical' | 'horizontal'} menuType - ось отображение значений в селекте ( необязательный )
 */
export const CronSelect = ({
  options,
  multiple,
  value,
  onSelect,
  theme,
  label,
  menuType,
}: CronSelectType) => {
  return (
    <BasicSelect
      label={label}
      multiple={multiple}
      options={options}
      value={value}
      onSelect={(e) => onSelect(e.toString())}
      minWidth={'50px'}
      margin={'0 5px'}
      theme={theme}
      menuType={menuType}
    />
  );
};
