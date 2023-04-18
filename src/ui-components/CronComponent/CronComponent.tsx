import React, { useEffect, useState } from 'react';

import { createTheme, Switch } from '@mui/material';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import {
  CronDateENUM,
  CronFormatInTime,
  cronToDate,
  dateToCron,
  getArraySymbolsFromStringWithSpaces,
} from '../..';
import { Block, Text } from '../../ui-styled-components';
import { BasicButton } from '../BasicButton/BasicButton';

import { CronSelect } from './CronSelect/CronSelect';
import {
  CronComponentPropsType,
  DateItemsType,
  DateObjectType,
  DaysOfWeeks,
  DaysOfWeeksForSave,
  DaysOfWeeksValues,
} from './types';

/**
 * JSX Component ( CronComponent )
 * Компонента принимает дату и преобразует ее в крон формат
 * Принимает следующие пропсы
 * @param {(value:string) => void} props.onSubmit (необязательный)
 */
export function CronComponent(props: CronComponentPropsType) {
  //---------------------------------------------Инициализируем переменные--------------------------------------------

  const {
    withButton = true,
    onChangeValue = false,
    defaultValue = '',
    changeMode = true,
    switchCrone = true,
  } = props;
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
   * Условие для автоматического выбора типа интервью при первой отрисовке
   */

  const chooseSwitchValue = (defaultValue: string): 'once' | 'multiple' => {
    if (!defaultValue) return 'once';
    else {
      const arraySymbols = getArraySymbolsFromStringWithSpaces(defaultValue);

      if (arraySymbols[4] === '1/1' || arraySymbols[3] === '?')
        return 'multiple';
      else return 'once';
    }
  };

  /**
   * Режим редактирования
   */
  const [editMode, setEditMode] = useState(false);
  /**
   * Выбор даты , единожды или с повторением
   */
  const [switchValue, setSwitchValue] = useState<'once' | 'multiple'>(
    chooseSwitchValue(defaultValue)
  );

  //once
  /**
   * Дата при выборе единожды
   */
  const [startDate, setStartDate] = useState<string>(
    chooseSwitchValue(defaultValue) === 'once'
      ? cronToDate(defaultValue).toString()
      : ''
  );

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
   * Фукнция для изменения значения даты при множественном выборре
   */
  const changeDate = (type: DateItemsType, value: []) => {
    setDate({ ...date, [type]: value });
  };

  /**
   * Функция преобразует массив Дней недели в словах в строку чисел по порядку недели
   */
  const arrayDaysOfWeekInStringNumbers = (array: string[]) => {
    const numberArr = array
      .filter((el) => DaysOfWeeksForSave[el as keyof typeof DaysOfWeeksForSave])
      .map((el) => DaysOfWeeksForSave[el as keyof typeof DaysOfWeeksForSave]);

    //const daysOgWeek = numberArr.map((el) => WeekEnum[el])

    if (numberArr.length > 1) {
      return numberArr.join(',');
    } else {
      return numberArr[0];
    }
  };

  /**
   * Функция при сабмите выбора даты
   */
  const submitTime = () => {
    let cronDate = '';

    if (switchValue === 'multiple') {
      if (date.period === 'День')
        cronDate = `0 ${date.minutes} ${date.hours} ? * * *`;
      if (date.period === 'Неделю') {
        const days = arrayDaysOfWeekInStringNumbers(date.day);

        cronDate = `0 ${date.minutes} ${date.hours} ? * ${days} *`;
      }
      if (date.period === 'Месяц') {
        const dayOfMonth = date.dayOfMonth.filter((d) => !isNaN(d));

        cronDate = `0 ${date.minutes} ${date.hours} ${dayOfMonth} 1/1 ? *`;
      }
    } else {
      cronDate = dateToCron(new Date(startDate));
    }
    props.onSubmit && props.onSubmit(cronDate);

    return cronDate;
  };

  /**
   * Фукнкция отвечающая за дизейбл кнопки сабмита
   */
  const checkForSubmit = (): boolean => {
    if (switchValue === 'once')
      return startDate.length < 1 || startDate === 'Invalid Date';
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

  const choosePeriodFromArraySymbols = (arraySymbols: string[]) => {
    const lengthStar = arraySymbols.filter((symbol) => symbol === '*');

    if (lengthStar.length === 3) return 'День';
    if (lengthStar.length === 2 && arraySymbols[3] === '?') return 'Неделю';
    else return 'Месяц';
  };

  const prepareSymbolsForCronSelectors = (
    value: string,
    isDays = false
  ): string[] | number[] => {
    if (!isDays) return value ? value.split(',').map((el) => Number(el)) : [];
    else
      return value
        ? value
            .split(',')
            .filter((el) => el !== '*')
            .map((day) => DaysOfWeeks[day as DaysOfWeeksValues])
        : [];
  };

  //----------------------------------------------UseEffect----------------------------------------------

  useEffect(() => {
    onChangeValue && !checkForSubmit() && onChangeValue(submitTime());
  }, [date, startDate]);

  useEffect(() => {
    if (chooseSwitchValue(defaultValue) === 'multiple') {
      const arraySymbols = getArraySymbolsFromStringWithSpaces(
        props.defaultValue as string
      );

      const newDay = prepareSymbolsForCronSelectors(
        arraySymbols[CronDateENUM.dayOfWeek],
        true
      );

      const newDayOfMonth = prepareSymbolsForCronSelectors(
        arraySymbols[CronDateENUM.days]
      );

      const newHours = prepareSymbolsForCronSelectors(
        arraySymbols[CronDateENUM.hours]
      );
      const newMinutes = prepareSymbolsForCronSelectors(
        arraySymbols[CronDateENUM.minutes]
      );

      const newDate = {
        day: newDay,
        dayOfMonth: newDayOfMonth,
        hours: newHours,
        minutes: newMinutes,
        period: choosePeriodFromArraySymbols(arraySymbols),
      };

      //@ts-ignore
      setDate(newDate);
    }
  }, [props.defaultValue]);

  //-----------------------------------------------------JSX----------------------------------------------------------

  return (
    <Block
      name={'cron-container'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      height={'auto'}
      margin={'0 0 20px 0'}
    >
      {props.defaultValue && !editMode ? (
        <Block
          name={'Текущее расписание'}
          margin={'20px 0 0 0'}
          flexDirection={'column'}
        >
          <Block name={'Тайтл'}>
            Текущее расписание :{CronFormatInTime(props.defaultValue)}
          </Block>
          {changeMode && (
            <BasicButton
              mode={'normal'}
              onClick={() => setEditMode(true)}
              text={'Изменить'}
            />
          )}
        </Block>
      ) : (
        <>
          {switchCrone && (
            <Block name={'switch-container'} height={'50px'} margin={'0 10px'}>
              <strong>Разовое интервью</strong>
              <Switch
                checked={switchValue === 'multiple'}
                onChange={() =>
                  setSwitchValue(switchValue === 'once' ? 'multiple' : 'once')
                }
              />
              <strong>Постоянные интервью</strong>
            </Block>
          )}

          {switchValue === 'once' ? (
            <Block name={'datetime-container'} height={'50px'}>
              <input
                type={'datetime-local'}
                value={dayjs(startDate).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setStartDate(e.currentTarget.value)}
              />
            </Block>
          ) : (
            <Block name={'datetime-container'} height={'50px'}>
              <>
                {date.period === periodOptions[0] && <Text>Каждый</Text>}
                {date.period === periodOptions[1] && <Text>Каждую</Text>}
                {date.period === periodOptions[2] && <Text>Каждый</Text>}
              </>
              <CronSelect
                options={periodOptions}
                onSelect={(e) => changeDate('period', e)}
                mode={'once'}
                value={date.period as string}
                key={nanoid()}
              />
              <>
                {date.period !== 'День' && date.period !== 'Месяц' && (
                  <>
                    В
                    <CronSelect
                      options={daysOptions}
                      value={date.day}
                      onSelect={(e) => changeDate('day', e)}
                    />
                  </>
                )}
              </>
              <>
                {date.period === 'Месяц' && (
                  <>
                    <CronSelect
                      options={daysOfMonthOptions}
                      value={date.dayOfMonth}
                      onSelect={(e) => changeDate('dayOfMonth', e)}
                      theme={horizontalTheme}
                    />
                    чисел
                    <span style={{ marginRight: '5px' }} />
                  </>
                )}
              </>
              <>
                В
                <CronSelect
                  options={hoursOptions}
                  value={date.hours}
                  onSelect={(e) => changeDate('hours', e)}
                  menuType={'horizontal'}
                  theme={horizontalTheme}
                />
                <>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {date.hours.length <= 1 ? (
                    date.hours.includes(21) || date.hours.includes(22) ? (
                      <Text>час в </Text>
                    ) : (
                      <Text> часов в</Text>
                    )
                  ) : (
                    <Text>часы в</Text>
                  )}
                  <CronSelect
                    options={minutesOptions}
                    value={date.minutes}
                    onSelect={(e) => changeDate('minutes', e)}
                    menuType={'horizontal'}
                    theme={horizontalTheme}
                  />
                  минут
                </>
              </>
            </Block>
          )}
          {withButton ? (
            <BasicButton
              mode={'normal'}
              onClick={() => submitTime()}
              text={'Submit'}
              style={buttonStyle}
              disabled={checkForSubmit()}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </Block>
  );
}
