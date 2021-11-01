import { Module } from "@nestjs/common";
import { CatsController } from "src/cats.controller";
import { CatsService } from "src/providers/cats/cats.service";

@Module({
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {}