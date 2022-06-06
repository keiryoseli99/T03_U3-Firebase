import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public myForm:FormGroup;
  public student:Estudiante;
  public validationMessages: object;

  constructor(
    private studentService:EstudianteService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name:["",[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      controlnumber:["",[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      curp:["",[Validators.required, Validators.pattern("^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$")]],
      age:[0,[Validators.required]],
      active:[false,[Validators.required]]
    });

    this.validationMessages = {
      'name': [
        {type: 'required', message: "Debe capturar el nombre"},
        {type: 'minLength', message: "Debe capturar más de 3 caracteres"},
        {type: 'maxLength', message: "Debe capturar máximo 150 caracteres"}
      ],
      'controlnumber': [
        {type: 'required', message: "Debe capturar el número de control"},
        {type: 'minLength', message: "Debe capturar 10 caracteres"},
        {type: 'maxLength', message: "Debe capturar 10 caracteres"}
      ],
      'curp': [
        {type: 'required', message: "Debe capturar la curp"},
        {type: 'pattern', message: "Debe capturar una curp valida"}
      ],
      'age': [
        {type: 'required', message: "Debe capturar la la edad"}
      ],
      'active': [
        {type: 'required', message: "Favor de activar"}
      ]
    }
  }

  create() {
    this.student = {
      name: this.myForm.controls.name.value,
      controlnumber: this.myForm.controls.controlnumber.value,
      age: this.myForm.controls.age.value,
      curp: this.myForm.controls.curp.value,
      active: this.myForm.controls.active.value
    }
    this.studentService.createStudent(this.student);
  }


}
