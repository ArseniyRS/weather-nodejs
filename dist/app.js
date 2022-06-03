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
import { getCommands, ECmds } from './getCommands.js';
import { getWeather } from './services/api.service/api.service.js';
import { ELang, langDict, saveLang } from './services/lang.service/lang.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';
function saveToken(token, lang = ELang.EN) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield saveKeyValue('token', token);
            printSuccess(langDict[lang].savedToken, lang);
        }
        catch (e) {
            printError(e.message);
        }
    });
}
function validateCmds(cmds, lang = ELang.EN) {
    const validated = Object.entries(cmds).filter(([key, value]) => {
        if (value === undefined) {
            printHelp(key, lang);
            return true;
        }
    });
    return validated.length;
}
function initCLI() {
    return __awaiter(this, void 0, void 0, function* () {
        const cmds = getCommands();
        const token = yield getKeyValue('token');
        const lang = ELang.EN;
        const city = '';
        if (validateCmds(cmds, lang)) {
            return;
        }
        if (cmds[ECmds.HELP]) {
            return printHelp(undefined, lang);
        }
        if (cmds[ECmds.SET_TOKEN]) {
            return saveToken(cmds[ECmds.SET_TOKEN], lang);
        }
        if (cmds[ECmds.SET_LANG]) {
            return saveLang(cmds[ECmds.SET_LANG], lang);
        }
        if (cmds[ECmds.SET_CITY]) {
            return getWeather(cmds[ECmds.SET_CITY]);
        }
        if (token && city) {
            return getWeather(city, lang);
        }
        return printHelp(undefined, lang);
    });
}
initCLI();
