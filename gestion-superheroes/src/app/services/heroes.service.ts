import { Injectable } from '@angular/core';
import {Heroe} from "../models/heroe.model";
import {Observable, of, throwError} from "rxjs";

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
  getHeroById(id: number): Observable<Heroe> {
    const hero = this.heroes.find(heroe => heroe.id === id);
    if (hero) {
      return of(hero);
    } else {
      // Maneja el caso donde el héroe no existe lanzando un error
      return throwError(() => new Error('Hero not found'));
    }
  }

  // Crear - Añadir un nuevo héroe
  addHero(hero: Heroe): Observable<Heroe[]> {
    const newId = this.heroes.length > 0 ? Math.max(...this.heroes.map(h => h.id)) + 1 : 1;
    const newHero = { ...hero, id: newId };
    this.heroes.push(newHero);
    return of(this.heroes);
  }


// Actualizar - Actualizar un héroe existente por su ID
  updateHero(heroId: number, hero: Heroe): Observable<Heroe[]> {
    const index = this.heroes.findIndex(h => h.id === heroId);
    if (index !== -1) {
      this.heroes[index] = { ...hero, id: heroId }; // Forzar el id al héroe actualizado
    } else {
      return throwError(() => new Error('Hero not found'));
    }
    return of(this.heroes);
  }




  // Eliminar - Eliminar un héroe por su índice
  deleteHero(id: number): Observable<Heroe[]> {
    this.heroes = this.heroes.filter(heroe => heroe.id !== id);
    return of(this.heroes);
  }


  // Nuevo - Filtrar héroes por nombre
  filterHeroes(query: string): Observable<Heroe[]> {
    query = query.toLowerCase();
    return of(this.heroes.filter(hero => hero.nombre.toLowerCase().includes(query)));
  }

}



// mokeado de los datos

const HEROES_MOCK: Heroe[] = [
  {
    id: 1,
    nombre: 'Bruce',
    apellido: 'Wayne',
    telefono: '912345678',
    edad: 30,
    descripcion: 'Empresario de día, protector de Gotham de noche.',
    fechaDeNacimiento: new Date(1990, 5, 15),
    imagenUrl: 'assets/heroes/batman.png'
  },
  {
    id: 2,
    nombre: 'clark',
    apellido: 'Kent',
    telefono: ' 955708090',
    edad: 35,
    descripcion: 'Periodista de día, protector de Metrópolis de noche.',
    fechaDeNacimiento: new Date(1985, 6, 18),
    imagenUrl: 'assets/heroes/superman.png'
  },
  {
    id: 3,
    nombre: 'tony',
    apellido: 'Stark',
    telefono: '633880022',
    edad: 40,
    descripcion: 'Genio, multimillonario, playboy, filántropo.',
    fechaDeNacimiento: new Date(1980, 4, 29),
    imagenUrl: 'assets/heroes/iron-man.png'
  },
  {
    id: 4,
    nombre: 'Logan',
    apellido: '',
    telefono: ' 600123456',
    edad: 100,
    descripcion: 'Mutante con poderes de regeneración, esqueleto de adamantium y garras retráctiles.',
    fechaDeNacimiento: new Date(1880, 0, 1),
    imagenUrl: 'assets/heroes/wolverine.jpg'
  }

];
