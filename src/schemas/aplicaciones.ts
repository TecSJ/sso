import { z } from 'zod';

export const insertAplicacion = z.object({
    clave: z.string({
        required_error: "La clave no puede estar vacía",  invalid_type_error: "La clave debe ser una cadena"
    })
    .max(10, { message: "La clave debe tener un máximo de 10 caracteres" })
    .min(3, { message: "La clave debe tener un mínimo de 3 caracteres" }),
    nombre: z.string({
        required_error: "El nombre no puede estar vacío",  invalid_type_error: "El nombre debe ser una cadena"
    })
    .max(200, { message: "La clave debe tener un máximo de 200 caracteres" }),
    redireccion: z.string({
        invalid_type_error: "La redirección debe ser una cadena"
    })
    .max(500, { message: "La redirección debe tener un máximo de 500 caracteres" }).optional()
});

