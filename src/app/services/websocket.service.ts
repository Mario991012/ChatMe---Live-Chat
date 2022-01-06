import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus: boolean = false;

  constructor(public socket: Socket) {
    this.checkStatus();
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
}
