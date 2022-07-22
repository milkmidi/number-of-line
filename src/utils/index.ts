const BIRTHDAY_PATTERN =
  /^(?:19|20)\d{2}\/([1-9]{1}|0[1-9]{1}|1[0-2]|[1-9])\/(3[0-1]|[1-2]\d|[1-9]|0[1-9]{1})$/;

/**
 * 是否台灣有效的生日格式 , ext：1981/09/09，注意，沒有檔 leap year
 * @param {string} value
 * @returns {boolean}
 */
export function validationBirthDay(value: string) {
  return BIRTHDAY_PATTERN.test(value);
}

export function parserBirthDay(birthDay: string) {
  const [year, month, day] = birthDay.split('/');
  const yearNumber = [...year, ...month, ...day].reduce((prev, curr) => {
    return prev + +curr;
  }, 0);
  const monthNumber = yearNumber
    .toString()
    .split('')
    .reduce((prev, curr) => {
      return prev + +curr;
    }, 0);
  const dayNumber = monthNumber
    .toString()
    .split('')
    .reduce((prev, curr) => {
      return prev + +curr;
    }, 0);

  return [yearNumber, monthNumber, dayNumber];
}
