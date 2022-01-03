import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socketStatus: boolean = false;

  constructor(private socket: Socket) {
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
}
