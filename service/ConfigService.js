import { config } from 'dotenv'

export class ConfigService {
  constructor() {
    const {error, parsed} = config();
    if (error || !parsed) {
      throw new Error("Ошибка прочтения env");
    }
    this.data = parsed;
  }
  get(key) {
    const res = this.data[key];
    if (!res) {
      throw new Error("Такого ключа нет в env");
    }
    return res;
  }
}
