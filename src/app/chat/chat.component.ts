import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Message } from '../models/Message';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messagesSubscription: Subscription = new Subscription();
  messages: Message[] = [];
  text: string = '';
  chatBox!: HTMLElement;
  yourName: string = '';

  constructor(public chatService: ChatService) { }

   ngOnInit(): void {

    this.setName();
    this.chatBox = document.getElementById('chat-messages') as HTMLElement;

    this.messagesSubscription = this.chatService.getMessages().subscribe( (message: any) => {

      if( this.isValidMessage( message ) ){
        this.messages.push( message );
        this.updateChatPosition( this.chatBox );
      }

    });
  }

  setName() {

    Swal.fire({
      title: 'What is your name?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'Accept',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => false,
      inputValidator: (result) => { 
          return !result ? 'You need to enter your name!' : ''
      }
    }).then((result) => {
      if(result && result.isConfirmed){
        this.yourName = result.value;
        Swal.fire({
          title: `Welcome ${result.value}!`,
          icon: 'success'
        })
      }else{
        Swal.fire({
          title: `Error!`,
          icon: 'error'
        })
      }
    })
  }

  isValidMessage( message : string ): boolean {
    return message != null && message != undefined && message !== ''; 
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }

  updateChatPosition(chat: HTMLElement | null ): void {
    setTimeout( () => {
      chat!.scrollTop = chat ? chat.scrollHeight : 100;
    }, 50)
  }

  sendMessage(): void {
    
    if(this.text.trim() !== '') {
      this.chatService.sendMessage(this.text, this.yourName);
      this.text = '';
    }

  }

}
