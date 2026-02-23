import { Injectable } from '@nestjs/common';

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
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async update({ id, email, password }: UpdateDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password,
      },
    });
  }

  async delete({ id, password }: DeleteDto) {
    return this.prisma.user.delete({
      where: {
        id,
        password,
      },
    });
  }

  async login({ email, password }: LoginDto) {
    return this.prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
  }
}
