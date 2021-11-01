import { Controller, Get, Post, HttpCode, Header, Body, Param, NotFoundException, BadRequestException, ParseIntPipe, UseFilters } from '@nestjs/common';
import { CatsService } from './providers/cats/cats.service';
import { Cat } from './models/cats/cat.interface';
import { CreateCatDto } from './models/cats/create-cat.dto';
import { HttpExceptionFilter } from './common/helpers/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
    
    constructor(private readonly catsService: CatsService) {}

    @Post()
    @HttpCode(204)
    create(@Body() cat: CreateCatDto) {
        if (this.catsService.findById(cat.id)) {
            throw new BadRequestException('Cat already found');
        }

        this.catsService.create(cat.id, cat);
    }

    @Get()
    @Header('Cache-Control', 'none') // Custom response header
    findAll(): Cat[] {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Cat {
        const cat = this.catsService.findById(id);
        if (cat) {
            return cat;
        }

        throw new NotFoundException('Cat not found');
    }
}