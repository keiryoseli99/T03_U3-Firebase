import { Estudiante } from './../models/estudiante';
import { Component } from '@angular/core';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Estudiante[];

  constructor(private service:EstudianteService) {
    this.service.getStudents().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,...e.payload.doc.data() as Estudiante
        } 
      })
    });
  }

}
