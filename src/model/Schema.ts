import { z } from 'zod';

export const contrasenas = z.object({
  contrasena: z.string({
    required_error: "La contraseña es obligatoria",
    invalid_type_error: "La contraseña debe ser una cadena"
  })
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  .max(18, { message: "La contraseña debe tener un máximo de 18 caracteres" })
  .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
  .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
  .regex(/\d/, { message: "La contraseña debe contener al menos un número" })
});
