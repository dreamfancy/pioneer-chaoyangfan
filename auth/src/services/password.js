import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt); //make scrypt from call back implementation to promise implementation

export class Password {
  static async toHash(password) {
    const salt = randomBytes(8).toString('hex');
    const buf = await scryptAsync(password, salt, 64); // the as clause is to let ts know what type the buf is.

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = await scryptAsync(suppliedPassword, salt, 64);
    return buf.toString('hex') === hashedPassword;
  }
}
