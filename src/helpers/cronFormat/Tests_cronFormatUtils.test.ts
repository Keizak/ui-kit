import { MonthRuENUM } from '../../types/types';
import { randomIntFromInterval } from '../commonHelpersFunctions';

import { CronFormatInTime } from './CronFormatInTime';

const minutes = randomIntFromInterval(1, 60);
const hours = randomIntFromInterval(1, 24);
const daysOfMonths = randomIntFromInterval(1, 30);
const daysOfWeek = '*';
const months = randomIntFromInterval(1, 12);

const resultMinutes = minutes.toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

const resultHours = hours.toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

it('CronFormatInTime дложен преобразовать крон строку в читабельную строку с числом месяца и месяцем, без дней недели', () => {
  expect(
    CronFormatInTime(`${minutes} ${hours} ${daysOfMonths} ${months} *`)
  ).toBeTruthy();
  expect(
    CronFormatInTime(
      `${minutes} ${hours} ${daysOfMonths} ${months} ${daysOfWeek}`
    )
  ).toBe(
    `В ${resultHours}:${resultMinutes}, в ${daysOfMonths} число месяца, только в ${MonthRuENUM[
      months
    ].toLowerCase()}`
  );
});
