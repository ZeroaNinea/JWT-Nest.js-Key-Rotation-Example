import { Injectable } from '@nestjs/common';
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
    const hash = await bcrypt.hash(password, 12);

    return this.prisma.user.delete({
      where: {
        id,
        password: hash,
      },
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.findByEmail(email);

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return null;

    return user;
  }
}
