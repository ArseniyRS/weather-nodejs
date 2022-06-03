var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { printError, printSuccess } from '../log.service.js';
import { getKeyValue, saveKeyValue } from '../storage.service.js';
export var ELang;
(function (ELang) {
    ELang["RU"] = "ru";
    ELang["EN"] = "en";
})(ELang || (ELang = {}));
export const langDict = {
    [ELang.RU]: {
        error: 'Ошибка',
        help: 'Помощь',
        savedToken: 'Токен сохранен',
        savedLang: 'Язык сохранен',
        helpForHelp: '-h для вывода помощи',
        helpForCity: '-c [CITY] для установки города',
        helpForToken: '-t [API_KEY] для установки токена',
        helpForLang: '-l [en/ru] для установки языка',
        allHelp: `-c [CITY] для установки города
              -t [API_KEY] для установки токена
              -l [en/ru] для установки языка
              -h для вывода помощи`,
        success: 'Успех',
        city: 'Город',
        temperature: 'Температура',
        weather: 'Погода',
        humidity: 'Влажность',
        pressure: 'Давление',
        wind: 'Ветер',
        now: 'Сейчас',
        cityNotFound: 'Город не найден',
        noValidToken: 'Неверный токен',
        noToken: 'Токен не установлен',
        setLangError: 'Неверный язык',
        setDefaultLang: 'Язык установлен по умолчанию (en)',
    },
    [ELang.EN]: {
        error: 'Error',
        help: 'Help',
        helpForHelp: '-h for help',
        helpForCity: '-c [CITY] for setting city',
        helpForToken: '-t [API_KEY] for setting token',
        helpForLang: '-l [en/ru] for setting language',
        allHelp: `-c [CITY] for setting city
              -t [API_KEY] for setting token
              -l [en/ru] for setting language
              -h for help`,
        success: 'Success',
        city: 'City',
        temperature: 'Temperature',
        weather: 'Weather',
        humidity: 'Humidity',
        pressure: 'Pressure',
        wind: 'Wind',
        now: 'Now',
        savedToken: 'Token saved',
        cityNotFound: 'City not found',
        noValidToken: 'No valid token',
        noToken: 'Token not set',
        savedLang: 'Language saved',
        setLangError: 'Wrong language',
        setDefaultLang: 'Default language set (en)',
    },
};
export function validateLang(langType, lang = ELang.EN) {
    if (!langDict[langType]) {
        printError(langDict[ELang.EN].setLangError);
        return false;
    }
    return true;
}
export function saveLang(langType, lang = ELang.EN) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validateLang(langType, lang)) {
            try {
                yield saveKeyValue('lang', langType);
                printSuccess(langDict[lang].savedLang, lang);
            }
            catch (e) {
                printError(e.message);
            }
        }
    });
}
export function getLang() {
    return __awaiter(this, void 0, void 0, function* () {
        const lang = yield getKeyValue('lang');
        if (lang && langDict[lang]) {
            return lang;
        }
        yield saveKeyValue('lang', ELang.EN);
        return ELang.EN;
    });
}
