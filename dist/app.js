#!/usr/bin/env node
import getArgs from "./getArgs.js";
import { printHelp } from './services/log.service.js';
function initCLI() {
    const args = getArgs();
    console.log(args);
    if (args["-h"]) {
        printHelp();
    }
}
initCLI();
