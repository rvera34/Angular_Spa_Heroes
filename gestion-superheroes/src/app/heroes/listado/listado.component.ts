import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // Importar MatTableDataSource
import { HeroesService } from "../../services/heroes.service";
import { Heroe } from "../../models/heroe.model";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  // Define las columnas que se van a mostrar en la tabla
  displayedColumns: string[] = ['nombre', 'apellido', 'telefono', 'edad', 'descripcion', 'fechaDeNacimiento', 'imagenUrl','acciones'];

  // Utiliza MatTableDataSource para manejar los datos de la tabla de forma reactiva
  dataSource = new MatTableDataSource<Heroe>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroesService: HeroesService,public dialog: MatDialog,private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // todo    Si, por ejemplo, en lugar de realizar una petición inicial, la aplicación realizara una
  // todo    consulta a la base de datos, pasaríamos el evento del usuario en la petición.
  // todo    con algo parecido a   this.heroesService.getHeroes( VALOR DE ENTRADA  ).subscribe(
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Aplicar el filtro solo si la longitud del valor es al menos de 3 caracteres
    if (filterValue.length >= 3) {
      this.dataSource.filter = filterValue;
    } else {
      // Limpiar el filtro si el valor tiene menos de 3 caracteres
      this.dataSource.filter = '';
    }
  }


  loadHeroes(): void {
    // Suscribirse al servicio para obtener los héroes y asignarlos a la fuente de datos de la tabla
    this.heroesService.getHeroes().subscribe(heroes => {
      this.dataSource.data = heroes;
    });
  }

  deleteHero(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(id).subscribe(heroes => {
          this.loadHeroes(); // Recarga los héroes
          this.notificationService.show('Héroe eliminado con éxito');
        });
      }
    });
  }



}
