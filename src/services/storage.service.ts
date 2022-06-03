import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'
const filePath = join(homedir(), 'weather-data.json')

console.log(filePath)
async function isExistPath(path: string) {
  try {
    await promises.stat(path)
    return true
  } catch {
    return false
  }
}

async function getKeyValue(key: string) {
  if (await isExistPath(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file.toString())
    return data[key]
  }
  return undefined
}

async function saveKeyValue(key: string, value: string) {
  let data: Record<string, string> = {}
  if (await isExistPath(filePath)) {
    const file = await promises.readFile(filePath)
    data = JSON.parse(file.toString())
  }
  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

export { getKeyValue, saveKeyValue }
