import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
  import { Persona } from './persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

  export class PersonaComponent implements OnInit {
    constructor(
      private personaService: PersonaService) {
      setInterval(() => {
        this.printRows();
      }, 6000);
    }
    ngOnInit(): void {
      const con = this.personaService.getPersonas()
      con.subscribe((data: Persona[]) => {
        this.rows = data
      }, error => {
        console.error(error);
        // Maneja el error de alguna manera
      })
    }
    printRows() {
      console.log(this.rows);
    }
  
    backupRowData: null | Persona = null
    cancel(row: Persona) {
      console.log(this.rows.indexOf(row) == this.rows.length - 1)
      if (this.rows.indexOf(row) == this.rows.length - 1) {
        this.rows.pop()
      } else {
        if (this.backupRowData) {
          Object.assign(row, this.backupRowData);
          this.backupRowData = null; // limpiar la copia de seguridad
        }
        row.isEditing = false; // deshabilitar la edición
      }
  
    }
  
    rows: Persona[] = [];
  
    addNewRow(): void {
  
      this.rows.push({ id: '', nombre: '', direccion: '', telefono: '', isEditing: true });
    }
  
    addRow(row: Persona): void {
      const { id, isEditing, ...data } = row
      if (row.nombre && row.direccion && row.telefono) {
        console.log("--->", row.id, row.id === "")
        if (row.id === "") {
          const con = this.personaService.postPersona({
            ...data
          })
          con.subscribe((data: Persona) => {
            this.rows.pop()
            this.rows.push(data)
          }, error => {
            console.error(error);
            // Maneja el error de alguna manera
          })
        } else {
          this.personaService.putPersonas({
            id: id,
            ...data
          }).subscribe()
        }
        row.isEditing = false;
      }
    }
    startEdit(row: Persona) {
      this.backupRowData = { ...row };
      row.isEditing = true; // habilitar la edición
    }
  
    deleteRow(index: number): void {
      const pos = this.rows.splice(index, 1);
      this.personaService.deletePersonas(pos[0].id).subscribe((data: any) => {
      }, error => {
        console.error(error);
        // Maneja el error de alguna manera
      }
      )
  
  
    }
}
