import chalk from 'chalk';
import dedent from 'dedent';
import { ECmds } from '../getCommands.js';
import { ELang, langDict } from './lang.service/lang.service.js';
function getWeatherIcon(iconCode) {
    switch (iconCode) {
        case '01d':
            return '☀️';
        case '02d':
            return '🌤';
        case '03d':
            return '☁️';
        case '04d':
            return '☁️';
        case '09d':
            return '🌧';
        case '10d':
            return '🌦';
        case '11d':
            return '⛈';
        case '13d':
            return '🌨';
        case '50d':
            return '🌫';
        case '01n':
            return '🌙';
        case '02n':
            return '🌤';
        case '03n':
            return '☁️';
        case '04n':
            return '☁️';
        case '09n':
            return '🌧';
        case '10n':
            return '🌦';
        case '11n':
            return '⛈';
        case '13n':
            return '🌨';
        case '50n':
            return '🌫';
    }
}
function printError(msg, lang = ELang.EN) {
    return console.log(chalk.bgRed(langDict[lang].error) + ' ' + msg);
}
function printSuccess(msg, lang = ELang.EN) {
    return console.log(chalk.bgGreen(langDict[lang].success) + ' ' + msg);
}
function printHelp(variant, lang = ELang.EN) {
    if (variant === ECmds.SET_CITY) {
        return console.log(chalk.bgYellow(langDict[lang].helpForCity));
    }
    if (variant === ECmds.SET_TOKEN) {
        return console.log(chalk.bgYellow(langDict[lang].helpForToken));
    }
    if (variant === ECmds.SET_LANG) {
        return console.log(chalk.bgYellow(langDict[lang].helpForLang));
    }
    return console.log(dedent(chalk.bgYellow(`${langDict[lang].help}: \n`) + langDict[lang].allHelp));
}
function printWeather(data, lang = ELang.EN) {
    console.log(dedent(chalk.bgGreen(`${langDict[lang].now}:\n`) +
        `${langDict[lang].city}: ${data.name}
        ${langDict[lang].temperature}: ${data.main.temp}
        ${langDict[lang].weather}: ${getWeatherIcon(data.weather[0].icon)} ${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)}
        ${langDict[lang].humidity}: ${data.main.humidity}%
        ${langDict[lang].pressure}: ${data.main.pressure} мбар
        ${langDict[lang].wind}: ${data.wind.speed}
      `));
}
export { printWeather, printError, printSuccess, printHelp };
