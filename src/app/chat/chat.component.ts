import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../classes/User';
import { Message } from '../models/Message';
import { ChatService } from '../services/chat.service';
import { WebsocketService } from '../services/websocket.service';

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
  isYourMessage: boolean = false;
  yourId: string = '';
  loggedUser!: User;

  constructor(public chatService: ChatService, public wsService: WebsocketService) { }

   async ngOnInit() {

    this.loggedUser = this.wsService.getUser();

    if(!this.loggedUser) {
      await this.setName();
    } else {
      this.chatService.reloginToChat(this.wsService.getUser());
    }
    this.chatBox = document.getElementById('chat-messages') as HTMLElement;

    this.messagesSubscription = this.chatService.getMessages().subscribe( (message: any) => {

      if( this.isValidMessage( message ) ) {

        this.messages.push( message );
        this.updateChatPosition( this.chatBox );
      }

    });
  }

  setName() {

    Swal.fire({
      title: 'What is your name?',
      input: 'text',
      backdrop: `
        rgba(0, 0, 0, 0.7)
        no-repeat
      `,
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
        let successLogin: any = this.chatService.loginToChat(this.yourName);

        let welcome = document.getElementById('welcomeTitle') as HTMLElement;
        welcome.innerHTML = `Welcome ${this.yourName}!`

        if(successLogin){
          Swal.fire({
            toast: true,
            position: 'top-right',
            title: `Welcome ${result.value}`,
            text: `Say hi to all the users connected!`,
            icon: 'success',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true
          })
        } else {
          Swal.fire({
            title: `An Error has occured`,
            text: 'Try to login again...',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
          })
        }
        
      }else{
        Swal.fire({
          title: `Error!`,
          icon: 'error'
        })
      }
    })
  }

  logout() {
    this.wsService.logout();
    document.location.reload();
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
      this.chatService.sendMessage(this.text, this.wsService.getUser().name, this.wsService.getUser().id);
      this.text = '';
    }

  }

}
