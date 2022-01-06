import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.css']
})
export class MessageBubbleComponent implements OnInit {

  constructor() { }

  @Input() message: string = '';
  @Input() name: string = '';

  ngOnInit(): void {
  }

}
