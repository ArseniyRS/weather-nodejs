#!/usr/bin/env node

import { getCommands, ECmds, ICommand } from './getCommands.js'
import { getWeather } from './services/api.service/api.service.js'
import { ELang, langDict, validateLangAndSave } from './services/lang.service/lang.service.js'
import { printError, printHelp, printSuccess } from './services/log.service.js'
import { getKeyValue, saveKeyValue } from './services/storage.service.js'
async function saveToken(token: string, lang = ELang.EN) {
  try {
    await saveKeyValue('token', token)
    printSuccess(langDict[lang].savedToken, lang)
  } catch (e: any) {
    printError(e.message)
  }
}

function validateCmds(cmds: ICommand, lang = ELang.EN) {
  const validated = Object.entries(cmds).filter(([key, value]) => {
    if (value === undefined) {
      printHelp(key as ECmds, lang)
      return true
    }
  })
  return validated.length
}
async function initCLI() {
  const cmds: ICommand = getCommands()
  const token = await getKeyValue('token')
  const city = await getKeyValue('city')
  const lang = await getKeyValue('lang')
  validateLangAndSave(lang)
  if (cmds[ECmds.HELP]) {
    return printHelp(undefined, lang)
  }
  if (cmds[ECmds.SET_TOKEN]) {
    return saveToken(cmds[ECmds.SET_TOKEN] as string, lang)
  }
  if (cmds[ECmds.SET_LANG]) {
    validateLangAndSave(lang)
  }
  if (cmds[ECmds.SET_CITY]) {
    return getWeather(cmds[ECmds.SET_CITY] as string)
  }
  if (validateCmds(cmds, lang)) {
    return
  }
  if (token && city) {
    return getWeather(city, lang)
  }

  return printHelp(undefined, lang)
}
initCLI()
