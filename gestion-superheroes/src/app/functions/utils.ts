//aqui tendriamos las funciones que podemos usar entre los disntintos modulos Ej:heroes


// stringFunctions.ts
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
