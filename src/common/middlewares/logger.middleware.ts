import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';


export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        console.log(`Starting ${req.method} request to ${req.originalUrl}`);
        next();
        console.log(`Finishing ${req.method} request to ${req.originalUrl}`);
    }

}