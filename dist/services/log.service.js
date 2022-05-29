import chalk from "chalk";
const printError = (msg) => console.log(chalk.bgRed("Error: " + msg));
const printSuccess = (msg) => console.log(chalk.bgGreen("Success: " + msg));
const printHelp = () => console.log(chalk.bgYellow(`Help:
  -s [CITY] для установки города
  -h для вывода помощи
  -t [API_KEY] для ввода токена`));
function printWeather(data) {
    console.log(`Город: ${data.name}
    Температура: ${data.main.temp}c
    Погода: ${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)}
    Влажность: ${data.main.humidity}%
    Давление: ${data.main.pressure} мбар
    Ветер: ${data.wind.speed} км/ч
    `);
}
export { printWeather, printError, printSuccess, printHelp };
