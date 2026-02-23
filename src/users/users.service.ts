import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(email: string, password: string) {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async update(id: string, email: string, password: string) {
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

  async delete(id: string, password: string) {
    return this.prisma.user.delete({
      where: {
        id,
        password,
      },
    });
  }
}
