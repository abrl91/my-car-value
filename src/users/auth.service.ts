import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService ) {}

  async register(email: string, password: string) {
    const user = await  this.userService.find(email);

    if (user.length) {
      throw new BadRequestException('user already exists');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    const newUser = await this.userService.create(email, hashedPassword);
    return newUser;
  }

  async authenticate(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, sortedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (sortedHash !== hash.toString('hex')) {
      throw new BadRequestException('password does not match');
    }

    return user;
  }

}