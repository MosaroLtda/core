export function dateTest(date: string | Date) {
  if (date instanceof Date) return true;

  if (!date || typeof date === 'number' || Number(date)) {
    return false;
  }

  const d = new Date(date);

  return !!d.getTime();
}

export function numberTest(number: number | string) {
  if (number === undefined) return;

  const vTrim = `${number}`.trim();

  return !isNaN(parseFloat(vTrim)) && isFinite(Number(vTrim));
}

export function stringTest(str: string) {
  return typeof str === 'string';
}

export function emailTest(str: string) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(str);
}

export function bigIntTest(val: number) {
  return val % 1 == 0;
}

export function generoTest(val: string) {
  return val === 'M' || val === 'F';
}

export function statusTest(val: string) {
  return val === 'A' || val === 'I';
}

export function cepTest(val: string) {
  const valTrim = `${val}`.trim().replace(/\D/g, '');

  if (valTrim.length === 8) return true;
}

export function cpfTest(val: string) {
  const valTrim = `${val}`.trim().replace(/\D/g, '');

  if (valTrim.length === 11) return true;
}

export function cnpjTest(val: string) {
  const valTrim = `${val}`.trim().replace(/\D/g, '');

  if (valTrim.length === 14) return true;
}

export function inscEstadualTest(val: string) {
  const valTrim = `${val}`.trim().replace(/\D/g, '');

  if (valTrim.length === 9) return true;
}

export function hourTest(val: string) {
  const hourMinuteSecond = `${val}`.split(':');

  if (hourMinuteSecond.length !== 2 && hourMinuteSecond.length !== 3) {
    return false;
  }
  const [hour, minute, seconds = '00'] = hourMinuteSecond;

  if (hour.length !== 2 || minute.length !== 2) return false;

  if (!numberTest(hour) || !numberTest(minute)) {
    return false;
  }

  if (seconds !== undefined && !numberTest(seconds)) {
    return false;
  }

  const checkHour = 0 <= Number(hour) && 0 <= Number(hour) && Number(hour) <= 23;
  const checkMinute = 0 <= Number(minute) && Number(minute) <= 59;
  const checkSeconds = seconds ? 0 <= Number(seconds) && Number(seconds) <= 59 : true;

  return checkHour && checkMinute && checkSeconds;
}

export function booleanTest(val: boolean) {
  return val === true || val === false;
}

export function phoneBrTest(str: string) {
  const valTrim = `${str}`.trim().replace(/\D/g, '');

  if (valTrim.length === 11 || valTrim.length === 10) return true;

  return false;
}

export function lengthStringTest(str: string, length: number): boolean {
  if (!str) return false;
  return `${str}`.trim().length >= length;
}

export function specialCharacterTest(str: string): boolean {
  return /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(str);
}
