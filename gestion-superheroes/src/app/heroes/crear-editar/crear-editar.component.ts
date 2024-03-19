import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent {

  heroeForm: FormGroup;
  id: number | null = null;
  fileName = '';

  constructor(
    private heroesService: HeroesService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.heroeForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl(''),
      telefono: new FormControl(''),
      edad: new FormControl(0, [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', Validators.required),
      fechaDeNacimiento: new FormControl('', Validators.required),
      imagenUrl: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.heroesService.getHeroById(this.id).subscribe(heroe => {
          this.heroeForm.setValue({
            nombre: heroe.nombre,
            apellido: heroe.apellido,
            telefono: heroe.telefono,
            edad: heroe.edad,
            descripcion: heroe.descripcion,
            fechaDeNacimiento: heroe.fechaDeNacimiento,
            imagenUrl: heroe.imagenUrl
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.id != null) {
      // Editar héroe existente
      this.heroesService.updateHero(this.id, this.heroeForm.value).subscribe({
        next: () => {
          this.router.navigate(['/listado']).then(() => {
            this.notificationService.show('Héroe actualizado con éxito');
          });
        },
        error: () => {
          this.notificationService.show('Error al actualizar el héroe', 'OK', 5000);
        }
      });
    } else {
      // Crear nuevo héroe
      this.heroesService.addHero(this.heroeForm.value).subscribe({
        next: () => {
          this.router.navigate(['/listado']).then(() => {
            this.notificationService.show('Héroe añadido con éxito');
          });
        },
        error: () => {
          this.notificationService.show('Error al añadir el héroe', 'OK', 5000);
        }
      });
    }
  }


  onClose(): void {
    this.router.navigate(['/listado'], { relativeTo: this.route });
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Aquí puedes manejar la carga del archivo, por ejemplo, leyéndolo como una URL local
      // Para propósitos de demostración, usaré una ruta estática de la carpeta assets
      // Suponiendo que tienes una imagen llamada 'example.jpg' en la carpeta 'assets/images'
      this.heroeForm.get('imagenUrl')!.setValue('assets/images/example.jpg');
    }
  }

}
