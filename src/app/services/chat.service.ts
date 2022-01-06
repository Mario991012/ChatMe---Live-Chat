import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage(message: string, name: string) {

    const payload = {
      from: name,
      body: message
    }
    console.log("mensaje enviado")
    this.wsService.emit('message', payload)
  }

  getMessages() {
    return this.wsService.listen('newMessage');
  }
}
