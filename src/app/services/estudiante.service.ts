import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  // private coleccion: AngularFirestoreCollection<Estudiante>

  constructor(private firestore:AngularFirestore) {
    // this.coleccion = this.firestore.collection<Estudiante>('estudiante');
   }

  createStudent(student: Estudiante){
    return this.firestore.collection('estudiante').add(student);
  }

  getStudents(){
    return this.firestore.collection('estudiante').snapshotChanges();
  }

  getStudentById(id: string){
    return this.firestore.collection('estudiante').doc(id).snapshotChanges();
    //return this.firestore.collection('estudiante').valueChanges({idField: id});
  }

  // getStudentById(id){
  //   return this.firestore.collection('estudiante').snapshotChanges(id);
  // }

  updateStudent(student: Estudiante, id: String){
    return this.firestore.doc('estudiante/'+id).update(student);
  }

  deleteStudent(id: String){
    return this.firestore.doc('estudiante/'+id).delete();
  }
}