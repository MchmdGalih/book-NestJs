/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 200,
    description: 'Book created',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.create(createBookDto);
    return {
      status: 'success',
      message: 'Book created successfully',
      data: book,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get All Books' })
  @ApiResponse({
    status: 200,
    description: 'Return All Books',
  })
  async findAll() {
    const books = await this.bookService.findAll();

    return {
      status: 'success',
      message: 'Books found',
      data: {
        books,
      },
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.findOne(+id);
    return {
      status: 'success',
      message: 'Book retrieved successfully',
      data: book,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Book updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.bookService.update(+id, updateBookDto);
    return {
      status: 'success',
      message: 'Book updated successfully',
      data: book,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID (soft delete)' })
  async remove(@Param('id') id: string) {
    await this.bookService.remove(+id);
    return {
      status: 'success',
      message: 'Book deleted successfully',
    };
  }
}
