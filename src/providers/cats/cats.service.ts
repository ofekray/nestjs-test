import { Injectable } from '@nestjs/common';
import { Cat } from 'src/models/cats/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Map<number, Cat>;

    constructor() {
        this.cats = new Map<number, Cat>();
    }
    
    create(id: number, cat: Cat) {
        this.cats.set(id, cat);
    }

    findAll(): Cat[] {
        return Array.from(this.cats.values());
    }

    findById(id: number): Cat {
        return this.cats.get(id);
    }
}