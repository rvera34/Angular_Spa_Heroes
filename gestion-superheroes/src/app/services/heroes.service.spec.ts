import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { Heroe } from "../models/heroe.model";

// Mock de datos para pruebas
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

];

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService]
    });
    service = TestBed.inject(HeroesService);
    service['heroes'] = [...HEROES_MOCK];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes() should return all heroes', () => {
    service.getHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(HEROES_MOCK.length);
      expect(heroes).toEqual(HEROES_MOCK);
    });
  });

  it('getHeroById() should return hero for valid id', () => {
    const heroId = 1; // ID de un héroe en HEROES_MOCK
    service.getHeroById(heroId).subscribe(hero => {
      // Asegúrate de que el héroe no sea undefined antes de proceder
      if (hero) {
        expect(hero).toEqual(jasmine.objectContaining({
          id: heroId
        }));
      } else {
        fail('Expected a hero, but got undefined');
      }
    });
  });





});
