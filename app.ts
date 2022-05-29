#!/usr/bin/env node

import getCommands from "./getCommands.js";
import { getWeather } from "./services/api.service/api.service.js";
import {printError, printHelp, printSuccess} from './services/log.service.js';
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";
async function saveToken(token: string){
  try{
    await saveKeyValue('token', token)
    printSuccess('Токен сохранен')
  }catch(e: any){
    printError(e.message)
  }
}

async function initCLI() {
  const cmds: any = getCommands()
  const token = await getKeyValue('token')
  const city = await getKeyValue('city')
    if(cmds["-h"]){
      return printHelp()
     }
     if(cmds["-t"]){
      return saveToken(cmds["-t"])
     }
     if(cmds["-c"]){
      return getWeather(cmds["-c"])
     }
     if(token && city){
      return getWeather(city)
     }
     return printHelp()
}
initCLI()