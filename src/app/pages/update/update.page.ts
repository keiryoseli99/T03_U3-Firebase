import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  public myForm:FormGroup;
  public student:Estudiante;
  public validationMessages: object;
  public students: Estudiante[];
  public id: string;

  public name: string;
  public controlnumber: string;
  public curp: string;
  public age: number;
  public active: boolean;

  constructor(
    private studentService:EstudianteService,
    private fb:FormBuilder,
    private route: ActivatedRoute
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(this.id).subscribe((resultado) => {
      if(resultado != null) {
        this.student = resultado.payload.data() as Estudiante;
        this.name = this.student.name;
        this.controlnumber = this.student.controlnumber;
        this.curp = this.student.curp;
        this.age = this.student.age;
        this.active = this.student.active;
        // return { name, ...active};
        this.myForm = this.fb.group({
          name:[this.name,[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
          controlnumber:[this.controlnumber,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          curp:[this.curp,[Validators.required, Validators.pattern("^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$")]],
          age:[this.age,[Validators.required]],
          active:[this.active,[Validators.required]]
        });
      }
    });
   }
  ngOnInit() {
    

    this.myForm = this.fb.group({
      name:[,[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      controlnumber:[,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      curp:[,[Validators.required, Validators.pattern("^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$")]],
      age:[,[Validators.required]],
      active:[,[Validators.required]]
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

  update() {
    this.student = {
      name: this.myForm.controls.name.value,
      controlnumber: this.myForm.controls.controlnumber.value,
      curp: this.myForm.controls.curp.value,
      age: this.myForm.controls.age.value,
      active: this.myForm.controls.active.value
    }
    this.studentService.updateStudent(this.student,this.id);
  }

  // update(){
  //   let id = this.route.snapshot.paramMap.get('id');
  //   this.studentService.updateStudent(this.student, id).then(res => {
  //     alert("update");
  //   }).catch(err => {
  //     console.log("error", err)
  //   })
  // }

  // update(student , active:boolean){
  //   // student.active = active;
  //   this.studentService.updateStudent(student, student.id)
  // }

}