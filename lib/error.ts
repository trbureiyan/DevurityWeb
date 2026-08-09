/**
 * Respuesta de error estructurada para endpoints de la API.
 * @param field - Identificador del campo o dominio que falló (ej: "semestre", "Contraseña")
 * @param message - Mensaje legible del error
 * @param code - Código de error de máquina (por defecto VALIDATION_ERROR)
 */
export const errorRequest = (
  field: string,
  message: string = "Falta el campo",
  code: string = "VALIDATION_ERROR",
) => ({
  code,
  field,
  message,
  // [DECISION] Se mantiene Error por compatibilidad con consumers legacy que leen data.Error.
  // Una vez todos los endpoints y tests migrados a data.field, eliminar este campo.
  Error: `${message}: ${field}`,
});
