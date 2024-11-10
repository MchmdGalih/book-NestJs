/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BookService {
  private logger = new Logger(BookService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll() {
    return await this.prisma.book.findMany({
      where: {
        delete_at: null,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.book.update({
      where: { id },
      data: {
        delete_at: new Date(),
      },
    });
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async removePermanently() {
    this.logger.debug('Called every 30 seconds!');
    await this.prisma.book.deleteMany({
      where: {
        delete_at: {
          not: null,
        },
      },
    });
  }
}
