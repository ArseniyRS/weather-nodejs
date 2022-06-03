export enum ECmds {
  SET_CITY = '-c',
  SET_TOKEN = '-t',
  HELP = '-h',
  SET_LANG = '-l',
}
export interface ICommand {
  [ECmds.SET_CITY]: string | undefined | null
  [ECmds.SET_TOKEN]: string | undefined | null
  [ECmds.HELP]: string | undefined | null
  [ECmds.SET_LANG]: string | undefined | null
  [key: string]: string | undefined | null
}
export function getCommands() {
  const res: ICommand = {
    [ECmds.SET_CITY]: null,
    [ECmds.HELP]: null,
    [ECmds.SET_TOKEN]: null,
    [ECmds.SET_LANG]: null,
  }
  const [executer, file, ...rest] = process.argv
  rest.forEach((value: string, index, array) => {
    if (Object.prototype.hasOwnProperty.call(res, value)) {
      if (array[index + 1]) {
        res[value as ECmds] = array[index + 1]
      } else {
        if(value !==ECmds.HELP){
          res[value as ECmds] = undefined
        }
      }
    } else {
      res[value] = undefined
    }
  })
  return res
}
