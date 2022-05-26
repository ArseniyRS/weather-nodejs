#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getArgs from "./getArgs.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue } from "./services/storage.service.js";
function saveToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield saveKeyValue('token', token);
            printSuccess('Токен сохранен');
        }
        catch (e) {
            printError(e.message);
        }
    });
}
function initCLI() {
    const args = getArgs();
    console.log(args);
    if (args["-h"]) {
        printHelp();
    }
    if (args["-t"]) {
        saveToken(args["-t"]);
    }
    getWeather('bishkek');
}
initCLI();
