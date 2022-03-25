"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialCharacterTest = exports.lengthStringTest = exports.phoneBrTest = exports.booleanTest = exports.hourTest = exports.inscEstadualTest = exports.cnpjTest = exports.cpfTest = exports.cepTest = exports.statusTest = exports.generoTest = exports.bigIntTest = exports.emailTest = exports.stringTest = exports.numberTest = exports.dateTest = void 0;
function dateTest(date) {
    if (date instanceof Date)
        return true;
    if (!date || typeof date === 'number' || Number(date)) {
        return false;
    }
    const d = new Date(date);
    return !!d.getTime();
}
exports.dateTest = dateTest;
function numberTest(number) {
    if (number === undefined)
        return;
    const vTrim = `${number}`.trim();
    return !isNaN(parseFloat(vTrim)) && isFinite(Number(vTrim));
}
exports.numberTest = numberTest;
function stringTest(str) {
    return typeof str === 'string';
}
exports.stringTest = stringTest;
function emailTest(str) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(str);
}
exports.emailTest = emailTest;
function bigIntTest(val) {
    return val % 1 == 0;
}
exports.bigIntTest = bigIntTest;
function generoTest(val) {
    return val === 'M' || val === 'F';
}
exports.generoTest = generoTest;
function statusTest(val) {
    return val === 'A' || val === 'I';
}
exports.statusTest = statusTest;
function cepTest(val) {
    const valTrim = `${val}`.trim().replace(/\D/g, '');
    if (valTrim.length === 8)
        return true;
}
exports.cepTest = cepTest;
function cpfTest(val) {
    const valTrim = `${val}`.trim().replace(/\D/g, '');
    if (valTrim.length === 11)
        return true;
}
exports.cpfTest = cpfTest;
function cnpjTest(val) {
    const valTrim = `${val}`.trim().replace(/\D/g, '');
    if (valTrim.length === 14)
        return true;
}
exports.cnpjTest = cnpjTest;
function inscEstadualTest(val) {
    const valTrim = `${val}`.trim().replace(/\D/g, '');
    if (valTrim.length === 9)
        return true;
}
exports.inscEstadualTest = inscEstadualTest;
function hourTest(val) {
    const hourMinuteSecond = `${val}`.split(':');
    if (hourMinuteSecond.length !== 2 && hourMinuteSecond.length !== 3) {
        return false;
    }
    const [hour, minute, seconds = '00'] = hourMinuteSecond;
    if (hour.length !== 2 || minute.length !== 2)
        return false;
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
exports.hourTest = hourTest;
function booleanTest(val) {
    return val === true || val === false;
}
exports.booleanTest = booleanTest;
function phoneBrTest(str) {
    const valTrim = `${str}`.trim().replace(/\D/g, '');
    if (valTrim.length === 11 || valTrim.length === 10)
        return true;
    return false;
}
exports.phoneBrTest = phoneBrTest;
function lengthStringTest(str, length) {
    if (!str)
        return false;
    return `${str}`.trim().length >= length;
}
exports.lengthStringTest = lengthStringTest;
function specialCharacterTest(str) {
    return /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(str);
}
exports.specialCharacterTest = specialCharacterTest;
