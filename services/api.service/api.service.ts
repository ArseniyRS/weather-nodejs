import axios from "axios";
import { printError, printWeather } from "../log.service.js";
import { getKeyValue, saveKeyValue } from "../storage.service.js";
import { IResponseWeather } from "./api.interface.js";

async function getWeather(city: string){
  const token = await getKeyValue('token')
  await saveKeyValue('city', city)
  if(!token){
    return printError('Не задан ключ API')
  }
  try{
  const {data} = await axios.get<IResponseWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=ru&units=metric`)
  return printWeather(data)
  }catch(e:any) {
    if(e?.response?.status == 404){
      return printError('Город не найден')
    }
    if(e?.response?.status == 401){
      return printError('Неверный токен')
    }
    return printError(e?.response?.message) 
  }
}

export {getWeather}