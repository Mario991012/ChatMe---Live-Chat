import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage(message: string, name: string, id: string) {

    const payload = {
      from: name,
      body: message,
      id: id
    }
    this.wsService.emit('message', payload)
  }

  getMessages() {
    return this.wsService.listen('newMessage');
  }

  async loginToChat( name: string ) {
    return (await this.wsService.loginWS( name ).then(success => { return success; })) as boolean;
  }

  async reloginToChat( user: User ) {
    return (await this.wsService.reloginWS( user ).then(success => { return success; })) as boolean;
  }
}
