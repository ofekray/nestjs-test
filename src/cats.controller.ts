import { Controller, Get, Post, HttpCode, Header, Body, Param, NotFoundException, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { Cat } from './models/Cat';

@Controller('cats')
export class CatsController {
    private cats: Map<number, Cat>;

    constructor() {
        this.cats = new Map<number, Cat>();
    }

    @Post()
    @HttpCode(204)
    create(@Body() cat: Cat): Cat {
        if (this.cats.has(cat.id)) {
            throw new BadRequestException('Cat already found');
        }

        this.cats.set(cat.id, cat);
        return cat;
    }

    @Get()
    @Header('Cache-Control', 'none') // Custom response header
    findAll(): Cat[] {
        return Array.from(this.cats.values());
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Cat {
        if (this.cats.has(id)) {
            return this.cats.get(id);
        }

        throw new NotFoundException('Cat not found');
    }
}