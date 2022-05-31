import axios from 'axios'
import { ECmds } from '../../getCommands.js'
import { ELang, langDict } from '../lang.service/lang.service.js'
import { printError, printHelp, printWeather } from '../log.service.js'
import { getKeyValue, saveKeyValue } from '../storage.service.js'
import { IResponseWeather } from './api.interface.js'

async function getWeather(city: string, lang = ELang.EN) {
  const token = await getKeyValue('token')
  await saveKeyValue('city', city)
  if (!token) {
    printError(langDict[lang].noToken, lang)
    return printHelp(ECmds.HELP)
  }
  try {
    const { data } = await axios.get<IResponseWeather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=${lang}&units=metric`,
    )
    return printWeather(data, lang)
  } catch (e: any) {
    if (e?.response?.status == 404) {
      return printError(langDict[lang].cityNotFound, lang)
    }
    if (e?.response?.status == 401) {
      printError(langDict[lang].noValidToken, lang)
      return printHelp(ECmds.HELP)
    }
    return printError(e?.response?.message)
  }
}

export { getWeather }
