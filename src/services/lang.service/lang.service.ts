import { printError, printSuccess } from '../log.service.js'
import { getKeyValue, saveKeyValue } from '../storage.service.js'
import { ILang } from './lang.interface'

export enum ELang {
  RU = 'ru',
  EN = 'en',
}
export const langDict: ILang = {
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
    // ${this.helpForHelp}
    // ${this.helpForLang}
    // ${this.helpForToken}`,
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
    // allHelp: `${this.helpForCity}
    //           ${this.helpForHelp}
    //           ${this.helpForLang}
    //           ${this.helpForToken}`,
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
}

export function validateLang(langType: ELang, lang = ELang.EN) {
  if (!langDict[langType]) {
    printError(langDict[ELang.EN].setLangError)
    return false
  }
  return true
}

export async function saveLang(langType: ELang, lang = ELang.EN) {
  if (validateLang(langType, lang)) {
    try {
      await saveKeyValue('lang', langType)
      printSuccess(langDict[lang].savedLang, lang)
    } catch (e: any) {
      printError(e.message)
    }
  }
}

export async function getLang() {
  const lang: ELang = await getKeyValue('lang')
  if (lang && langDict[lang]) {
    return lang
  }
  await saveKeyValue('lang', ELang.EN)
  return ELang.EN
}
