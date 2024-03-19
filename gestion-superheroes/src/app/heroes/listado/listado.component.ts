import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeroesService } from "../../services/heroes.service";
import { Heroe } from "../../models/heroe.model";
import { MatPaginator } from "@angular/material/paginator";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../services/notification.service";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { capitalizeFirstLetter } from '../../functions/utils';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'telefono', 'edad', 'descripcion', 'fechaDeNacimiento', 'imagenUrl','acciones'];
  dataSource = new MatTableDataSource<Heroe>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Implementación de debouncing para el filtrado
  private filterSubject = new Subject<string>();
  private filterDebounceTime = 300; // tiempo en milisegundos

  isLoading = true; // Indica si los datos están cargando

  constructor(private heroesService: HeroesService, public dialog: MatDialog, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadHeroes();

    // Manejar el filtrado con debouncing
    this.filterSubject.pipe(
      debounceTime(this.filterDebounceTime)
    ).subscribe(value => {
      this.dataSource.filter = value;
      this.dataSource.filteredData = this.dataSource.filteredData.map(hero => {
        return { ...hero, nombre: capitalizeFirstLetter(hero.nombre) };
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // todo    Si, por ejemplo, en lugar de realizar una petición inicial, la aplicación realizara una
  // todo    consulta a la base de datos, pasaríamos el evento del usuario en la petición.
  // todo    con algo parecido a   this.heroesService.getHeroes( VALOR DE ENTRADA  ).subscribe(
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // Emitir el valor al Subject solo si la longitud del valor es al menos de 3 caracteres
    if (filterValue.length >= 3 || filterValue === '') {
      this.filterSubject.next(filterValue);
    }
  }

  loadHeroes(): void {
    this.isLoading = true; // Antes de la llamada
    this.heroesService.getHeroes().subscribe(heroes => {
      this.dataSource.data = heroes.map(hero => {
        return { ...hero, nombre: capitalizeFirstLetter(hero.nombre) };
      });
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }
  deleteHero(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // Puedes pasar datos adicionales al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(id).subscribe({
          next: () => {
            this.loadHeroes(); // Recarga los héroes
            this.notificationService.show('Héroe eliminado con éxito');
          },
          error: () => {
            this.notificationService.show('Error al eliminar el héroe', 'OK', 5000);
          }
        });
      }
    });
  }


}
