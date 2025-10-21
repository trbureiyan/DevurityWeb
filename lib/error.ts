export const errorRequest = (
  value: string,
  message: string = "Falta el campo: ",
) => {
  return {
    Error: `${message}${value}`,
  };
};
