import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public myForm:FormGroup;
  public student:Estudiante;
  public validationMessages: object;

  constructor(
      private service: EstudianteService,
      private actroute: ActivatedRoute,
      private router:Router,
      private toast: ToastController,
      private fb:FormBuilder
  ) { 
    this.actroute.queryParams.subscribe(
      params => {
        if(params && params.special){
          this.student = JSON.parse(params.special) as Estudiante;
          console.log(this.student)
        }
      }
    );
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name:["",[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      controlnumber:["",[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      curp:[this.student.curp,[Validators.required, Validators.pattern("^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$")]],
      age:[this.student.age,[Validators.required]],
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

  delete(id: string) {
    this.service.deleteStudent(id);
    this.presentToast();
    this.router.navigate(['/home']);
  }

  async presentToast() {
    const t = await this.toast.create({
      message: 'Estudiante eliminado',
      duration: 2000
    });
    t.present();
  }

  update(id: string) {
    this.student = {
      name: this.student.name,
      controlnumber: this.student.controlnumber,
      age: this.myForm.controls.age.value,
      curp: this.myForm.controls.curp.value,
      active: this.student.active
    }
    this.service.updateStudent(this.student, id);
    this.presentToast2();
    this.router.navigate(['/home']);
  }

  async presentToast2() {
    const t = await this.toast.create({
      message: 'Estudiante actualizado',
      duration: 2000
    });
    t.present();
  }
}
