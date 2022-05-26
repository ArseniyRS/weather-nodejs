import axios from "axios";
import { printError } from "./log.service.js";
import { getKeyValue } from "./storage.service.js";

async function getWeather(city: string){
  const token = getKeyValue('token')
  if(!token){
    return printError('Не задан ключ API')
  }
  try{
  const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=ru&units=metric`)
  console.log(data)
  }catch(e:any) {
    return printError(e)
  }
}

export {getWeather}