const BIRTHDAY_PATTERN =
  /^(?:18|19|20)\d{2}\/([1-9]{1}|0[1-9]{1}|1[0-2]|[1-9])\/(3[0-1]|[1-2]\d|[1-9]|0[1-9]{1})$/;

/**
 * 是否台灣有效的生日格式 , ext：1981/09/09，注意，沒有檔 leap year
 * @param {string} value
 * @returns {boolean}
 */
export function validationBirthDay(value: string) {
  return BIRTHDAY_PATTERN.test(value);
}

export type NumberOfLifeResult = {
  major: number;
  minor: number;
  patch: number;
  minorText: string;
};
export function parserBirthDay(birthDay: string): NumberOfLifeResult {
  const [year, month, day] = birthDay.split('/');

  const yearNumber = [...year, ...month, ...day].reduce((prev, curr) => prev + +curr, 0);
  let monthNumber = yearNumber
    .toString()
    .split('')
    .reduce((prev, curr) => prev + +curr, 0);
  const dayNumber = monthNumber
    .toString()
    .split('')
    .reduce((prev, curr) => prev + +curr, 0);

  let minorText = '後天數';
  if (monthNumber.toString()[0] === monthNumber.toString()[1]) {
    minorText = '卓越數';
  } else if (monthNumber < 10) {
    minorText = '';
    monthNumber = -1;
  }
  return {
    major: yearNumber,
    minor: monthNumber,
    minorText,
    patch: dayNumber,
  };
}
