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
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Books' })
  @ApiResponse({
    status: 200,
    description: 'Return All Books',
  })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Book updated',
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID (soft delete)' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
