import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

import { SignupDto } from '../auth/dto/signup.dto';
import { UpdateDto } from '../auth/dto/update.dto';
import { DeleteDto } from '../auth/dto/delete.dto';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create({ email, password }: SignupDto) {
    const hash = await bcrypt.hash(password, 12);

    return this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
  }

  async update({ id, email, password }: UpdateDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(' X_X User not found.');
    }

    const hash = await bcrypt.hash(password, 12);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password: hash,
      },
    });
  }

  async delete({ id, password }: DeleteDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(' X_X User not found.');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException(' X_X Invalid credentials.');
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  // async login({ email, password }: LoginDto) {
  //   const user = await this.findByEmail(email);

  //   if (!user) {
  //     throw new NotFoundException(' X_X User not found.');
  //   }

  //   const isValid = await bcrypt.compare(password, user.password);

  //   if (!isValid) {
  //     throw new UnauthorizedException(' X_X Invalid credentials.');
  //   }

  //   return user;
  // }

  async validateUser({ email, password }: LoginDto) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}
