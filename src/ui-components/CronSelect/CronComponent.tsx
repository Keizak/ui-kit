import React, { ReactNode, useState } from 'react';

import { createTheme, Switch } from '@mui/material';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { Block, Text } from '../../ui-styled-components/common';
import { BasicButton } from '../BasicButton/BasicButton';
import { BasicSelect } from '../BasicSelect/BasicSelect';

import { CronSelect } from './CronSelect/CronSelect';
import { CronComponentPropsType, DateItemsType, DateObjectType } from './types';

/**
 * JSX Component ( CronComponent )
 * Компонента принимает дату и преобразует ее в крон формат
 * Принимает следующие пропсы
 * @param {(value:string) => void} props.onSubmit (необязательный)
 */
export function CronComponent(props: CronComponentPropsType) {
  //---------------------------------------------Инициализируем переменные--------------------------------------------
  /**
   * Тема для отоюражение вариантов селекта в горизонтаьном виде
   */
  const horizontalTheme = createTheme({
    components: {
      // Name of the component
      MuiMenu: {
        styleOverrides: {
          list: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '250px',
          },
        },
      },
    },
  });

  /**
   * Выбор даты , единожды или с повторением
   */
  const [switchValue, setSwitchValue] = useState(true);

  //once
  /**
   * Дата при выборе единожды
   */
  const [startDate, setStartDate] = useState<Date | string>('');

  //---every------------------------------------------------------------------------------------------------|

  //---options---
  /**
   * Опции выбора для селекторов при множественном выборе
   */
  const periodOptions = ['День', 'Неделю', 'Месяц'];
  const daysOptions = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];
  const daysOfMonthOptions = Array.from(new Array(31), (_x, i) => i + 1);
  const hoursOptions = Array.from(new Array(24), (_x, i) => i + 1).slice(7, 22);
  const minutesOptions = Array.from(new Array(13), (_x, i) => i * 5);

  //---values---
  /**
   * Дата при множественном выборре
   */
  const [date, setDate] = useState<DateObjectType>({
    period: periodOptions[0],
    day: [],
    dayOfMonth: [],
    hours: [],
    minutes: [],
  });
  //----------------------------------------------Дополнительные фукнции----------------------------------------------
  /**
   * Функция приобразующая формат Даты в крон формат
   */
  const dateToCron = (date: Date) => {
    const minutes = dayjs(date).get('m');
    const hours = dayjs(date).get('h');
    const days = dayjs(date).get('D');
    const months = dayjs(date).get('M');
    const dayOfWeek = dayjs(date).day();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
  };

  /**
   * Фукнция для изменения значения даты при множественном выборре
   */
  const changeDate = (type: DateItemsType, value: string) => {
    type === 'period'
      ? setDate({ ...date, [type]: value })
      : setDate({ ...date, [type]: value.split(',') });
  };

  /**
   * Функция преобразует массив Дней недели в словах в строку чисел по порядку недели
   */
  const arrayDaysOfWeekInStringNumbers = (array: string[]) => {
    // @ts-ignore
    const numberArr = array.map((el) => DaysOfWeeks[el]);

    return numberArr.join(',');
  };

  /**
   * Функция при сабмите выбора даты
   */
  const submitTime = () => {
    let cronDate = '';

    if (switchValue) {
      if (date.period === 'День')
        cronDate = `${date.minutes} ${date.hours} * * *`;
      if (date.period === 'Неделю') {
        const days = arrayDaysOfWeekInStringNumbers(date.day);

        cronDate = `${date.minutes} ${date.hours} * * ${days}`;
      }
      if (date.period === 'Месяц') {
        const dayOfMonth = date.dayOfMonth.join(',');

        cronDate = `${date.minutes} ${date.hours} ${dayOfMonth} * *`;
      }
    } else {
      cronDate = dateToCron(startDate as Date);
    }
    props.onSubmit && props.onSubmit(cronDate);
    console.log(cronDate);

    return cronDate;
  };

  /**
   * Фукнкция отвечающая за дизейбл кнопки сабмита
   */
  const checkForSubmit = (): boolean => {
    if (!switchValue) return startDate.toString().length < 1;
    switch (date.period) {
      case 'День':
        return date.minutes.length < 1 || date.hours.length < 1;
      case 'Неделю':
        return (
          date.minutes.length < 1 ||
          date.hours.length < 1 ||
          date.day.length < 1
        );
      case 'Месяц':
        return (
          date.minutes.length < 1 ||
          date.hours.length < 1 ||
          date.dayOfMonth.length < 1
        );
      default:
        return true;
    }
  };
  /**
   * Стиль кнопки в случае дизейба
   */
  const buttonStyle = checkForSubmit() ? { background: '#e1e1e1' } : {};

  /**
   * Дефолтные селекторы отоюражающие при множественном выборе
   */
  const defaultCronSelects: ReactNode[] = [
    <React.Fragment key={nanoid()}>
      {date.period === periodOptions[0] && <Text>Каждый</Text>}
      {date.period === periodOptions[1] && <Text>Каждую</Text>}
      {date.period === periodOptions[2] && <Text>Каждый</Text>}
    </React.Fragment>,
    <CronSelect
      label={'Период'}
      options={periodOptions}
      onSelect={(e) => changeDate('period', e.toString())}
      multiple={false}
      value={date.period as string}
      key={nanoid()}
    />,
    <React.Fragment key={nanoid()}>
      {date.period !== 'День' && date.period !== 'Месяц' && (
        <>
          В
          <CronSelect
            label={'День недели'}
            multiple={true}
            options={daysOptions}
            value={date.day}
            onSelect={(e) => changeDate('day', e.toString())}
          />
        </>
      )}
    </React.Fragment>,
    <React.Fragment key={nanoid()}>
      {date.period === 'Месяц' && (
        <>
          <CronSelect
            label={'Число месяца'}
            multiple={true}
            options={daysOfMonthOptions}
            value={date.dayOfMonth}
            onSelect={(e) => changeDate('dayOfMonth', e.toString())}
            theme={horizontalTheme}
          />
          чисел
          <span style={{ marginRight: '5px' }} />
        </>
      )}
    </React.Fragment>,
    <React.Fragment key={nanoid()}>
      В
      <CronSelect
        label={'Часы'}
        multiple={true}
        options={hoursOptions}
        value={date.hours}
        onSelect={(e) => changeDate('hours', e.toString())}
        menuType={'horizontal'}
        theme={horizontalTheme}
      />
    </React.Fragment>,
    <React.Fragment key={nanoid()}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {date.hours.length <= 1 ? (
        date.hours.includes('21') || date.hours.includes('22') ? (
          <Text>час в </Text>
        ) : (
          <Text> часов в</Text>
        )
      ) : (
        <Text>часы в</Text>
      )}
      <BasicSelect
        label={'Минуты'}
        multiple={true}
        options={minutesOptions}
        value={date.minutes}
        onSelect={(e) => changeDate('minutes', e.toString())}
        minWidth={'50px'}
        margin={'0 5px'}
        menuType={'horizontal'}
        theme={horizontalTheme}
      />
      минут
    </React.Fragment>,
  ];

  //-----------------------------------------------------JSX----------------------------------------------------------

  return (
    <Block name={'cron-container'} flexDirection={'column'} width={'700px'}>
      <Block name={'switch-container'} height={'50px'} margin={'0 10px'}>
        <strong>Разовое интервью</strong>
        <Switch
          checked={switchValue}
          onChange={() => setSwitchValue(!switchValue)}
        />
        <strong>Постоянные интервью</strong>
      </Block>

      {!switchValue ? (
        <Block name={'datetime-container'} height={'50px'}>
          <input
            type={'datetime-local'}
            value={startDate as string}
            onChange={(e) => setStartDate(e.currentTarget.value)}
          />
        </Block>
      ) : (
        <Block name={'datetime-container'} height={'50px'}>
          {defaultCronSelects.map((el) => el)}
        </Block>
      )}
      <BasicButton
        mode={'normal'}
        onClick={() => submitTime()}
        text={'Submit'}
        style={buttonStyle}
        disabled={checkForSubmit()}
      />
    </Block>
  );
}
