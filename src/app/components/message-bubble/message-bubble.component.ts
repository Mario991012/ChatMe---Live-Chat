import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.css']
})
export class MessageBubbleComponent {

  constructor(public wsService: WebsocketService) { }

  @Input() message: string = '';
  @Input() name: string = '';
  @Input() idUser: string = '';

}
