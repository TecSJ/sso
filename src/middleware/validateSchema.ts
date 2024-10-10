import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateSchema = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Detener la ejecución del middleware con un return explícito
                res.status(400).json({
                    errors: error.errors.map((err) => err.message)
                });
                return;
            }
            next(error); // Si no es un error de Zod, lo pasamos al siguiente middleware de manejo de errores
        }
    };
};
