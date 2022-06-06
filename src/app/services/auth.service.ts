import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(
    public afAuth: AngularFireAuth,
    private afsAuth: AngularFireAuth
  ) { 
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  //register
  async onRegister(user:User) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      )
    } catch (error) {
      console.log('Error en el registro', error)
    }
  }

  //login
  async onLogin(user:User) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
    } catch (error) {
      console.log('Error en login', error);
    }
  }

  async onloginGitUser() {
    return await this.afsAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }
  async onloginGoogleUser() {
    return await this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
