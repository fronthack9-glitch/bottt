export class ConfigService {
    get(key) {
      const value = process.env[key]
  
      if (!value) {
        throw new Error(`ENV "${key}" не задан`)
      }
  
      return value
    }
}
