import { Injectable } from '@angular/core';
import {Heroe} from "../models/heroe.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroes: Heroe[] = HEROES_MOCK;

  constructor() { }

  // Leer - Obtener todos los héroes
  getHeroes(): Observable<Heroe[]> {
    return of(this.heroes);
  }


  // Leer - Obtener un héroe por su índice
  getHeroByIndex(index: number): Observable<Heroe> {
    return of(this.heroes[index]);
  }

  // Crear - Añadir un nuevo héroe
  addHero(hero: Heroe): Observable<Heroe[]> {
    this.heroes.push(hero);
    return of(this.heroes);
  }

  // Actualizar - Actualizar un héroe existente por su índice
  updateHero(index: number, hero: Heroe): Observable<Heroe[]> {
    if (index >= 0 && index < this.heroes.length) {
      this.heroes[index] = hero;
    }
    return of(this.heroes);
  }

  // Eliminar - Eliminar un héroe por su índice
  deleteHero(index: number): Observable<Heroe[]> {
    this.heroes = this.heroes.filter((_, i) => i !== index);
    return of(this.heroes);
  }

}



// mokeado de los datos

const HEROES_MOCK: Heroe[] = [
  {
    nombre: 'Bruce',
    apellido: 'Wayne',
    telefono: '123456789',
    edad: 30,
    descripcion: 'Empresario de día, protector de Gotham de noche.',
    fechaDeNacimiento: new Date(1990, 5, 15),
    imagenUrl: 'assets/heroes/batman.png'
  },
  {
    nombre: 'Clark',
    apellido: 'Kent',
    telefono: '999999999',
    edad: 35,
    descripcion: 'Periodista de día, protector de Metrópolis de noche.',
    fechaDeNacimiento: new Date(1985, 6, 18),
    imagenUrl: 'assets/imagenes/superman.png'
  },
  {
    nombre: 'Tony',
    apellido: 'Stark',
    telefono: '888888888',
    edad: 40,
    descripcion: 'Genio, multimillonario, playboy, filántropo.',
    fechaDeNacimiento: new Date(1980, 4, 29),
    imagenUrl: 'assets/imagenes/iron-man.png'
  },{
    nombre: 'Logan',
    apellido: '',
    telefono: '777777777',
    edad: 100,
    descripcion: 'Mutante con poderes de regeneración, esqueleto de adamantium y garras retráctiles.',
    fechaDeNacimiento: new Date(1880, 0, 1),
    imagenUrl: 'assets/imagenes/wolverine.jpg'
  }

];
