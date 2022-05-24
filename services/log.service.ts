import chalk from "chalk";
import log4js from "log4js";
const logger = log4js.getLogger("main");
const printError = (msg: string) => console.log(chalk.bgRed("Error: " + msg));
const printSuccess = (msg: string) =>  console.log(chalk.bgGreen("Success: " + msg));
const printHelp = () => console.log(chalk.bgYellow(
  `Help:
  -s [CITY] для установки города
  -h для вывода помощи
  -t [API_KEY] для ввода токена`));

  export {printError, printSuccess, printHelp};