
export default function getCommands(){
  const res: Record<string, string | boolean | null | undefined> = {
    "-c": null,
    "-h": null,
    "-t": null
  }
  const [executer, file, ...rest] = process.argv
  rest.forEach((value: string, index, array) => {
      if(res.hasOwnProperty(value)){
        if(array[index + 1]){
          res[value] = array[index + 1]
        }else{
          res[value] = undefined
        }
      }
  })
  return res
}