#!/usr/bin/env node

import getArgs from "./getArgs.js";
import { getWeather } from "./services/api.service.js";
import {printError, printHelp, printSuccess} from './services/log.service.js';
import { saveKeyValue } from "./services/storage.service.js";
async function saveToken(token: string){

  try{
    await saveKeyValue('token', token)
    printSuccess('Токен сохранен')
  }catch(e: any){
    printError(e.message)
  }
}
function initCLI() {
   const args: any = getArgs()
   console.log(args)
   if(args["-h"]){
    printHelp()
   }
   if(args["-t"]){
    saveToken(args["-t"])
   }
   getWeather('bishkek')
}
initCLI()