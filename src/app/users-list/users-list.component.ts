import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  obs_activeUsers!: Observable<any>;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.obs_activeUsers = this.chatService.getActiveUsers();
  }

}
