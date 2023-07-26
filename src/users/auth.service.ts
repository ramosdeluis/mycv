import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // If email is in use
    const email_search = await this.usersService.find(email);

    if (email_search.length) {
      throw new BadRequestException('This email is already in use.');
    }
    // Hash the user password
    // Salt generation
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 128)) as Buffer;

    password = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.usersService.create(email, password);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new BadRequestException('Email is not correct.');
    }

    const [salt, storedHash] = user.password.split('.');

    const newHash = (await scrypt(password, salt, 128)) as Buffer;

    if (storedHash !== newHash.toString('hex')) {
      throw new BadRequestException('Password is not correct.');
    }
    return user;
  }
}
