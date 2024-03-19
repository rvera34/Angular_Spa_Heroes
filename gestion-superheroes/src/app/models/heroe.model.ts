export interface Heroe {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  edad: number;
  descripcion: string;
  fechaDeNacimiento: Date; // Usando Date para la fecha de nacimiento
  imagenUrl: string; // Ruta de la imagen del héroe
}
