import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus: boolean = false;
  private user!: User;

  constructor(public socket: Socket) {
    this.checkStatus();
    this.loadUser();
   }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log("Connected to server"); 
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log("Disconnected from server");
      this.socketStatus = false;
    }); 
  }

  emit( event: string, payload?: any, callback?: Function ) {
    this.socket.emit(event, payload, callback);
  }

  listen( event: string ) {
    return this.socket.fromEvent( event );
  }

  loginWS( name: string ) {

    return new Promise(resolve => {
      
      this.emit( 'config-user', { name }, (res: any) => {
        if(res) {

          this.user = new User( res.id, res.name );
          this.saveUser();
          resolve(true);

        } else {
          resolve(false);
        }
      })

    })
  }

  reloginWS( user: User ) {

    return new Promise(resolve => {
      
      this.emit( 'config-user', user, (res: any) => {
        if(res) {

          this.user = new User( res.id, res.name );
          this.saveUser();
          resolve(true);

        } else {
          resolve(false);
        }
      })

    })
  }

  saveUser() {
    localStorage.setItem('user', JSON.stringify( this.user ))
  }

  loadUser() {
    if( localStorage.getItem('user') ){
      this.user = JSON.parse( localStorage.getItem('user')! );
    }
  }

  getUser(){
    return this.user;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
