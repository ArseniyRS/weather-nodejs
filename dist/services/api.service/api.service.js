var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { ECmds } from '../../getCommands.js';
import { ELang, langDict } from '../lang.service/lang.service.js';
import { printError, printHelp, printWeather } from '../log.service.js';
import { getKeyValue, saveKeyValue } from '../storage.service.js';
function getWeather(city, lang = ELang.EN) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield getKeyValue('token');
        yield saveKeyValue('city', city);
        if (!token) {
            printError(langDict[lang].noToken, lang);
            return printHelp(ECmds.HELP);
        }
        try {
            const { data } = yield axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=${lang}&units=metric`);
            return printWeather(data, lang);
        }
        catch (e) {
            if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                return printError(langDict[lang].cityNotFound, lang);
            }
            if (((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.status) == 401) {
                printError(langDict[lang].noValidToken, lang);
                return printHelp(ECmds.HELP);
            }
            return printError((_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.message);
        }
    });
}
export { getWeather };
