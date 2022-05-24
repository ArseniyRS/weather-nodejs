#!/usr/bin/env node

import getArgs from "./getArgs.js";
import {printHelp} from './services/log.service.js';
import { saveKeyValue } from "./services/storage.service.js";

function initCLI() {
   const args: any = getArgs()
   console.log(args)
   if(args["-h"]){
    printHelp()
   }
   if(args["-t"]){
     saveKeyValue('token', args["-t"])
   }
}
initCLI()