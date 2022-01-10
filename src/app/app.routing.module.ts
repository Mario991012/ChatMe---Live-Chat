import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';


const routes: Routes = [
  {
    path: '', 
    component: ChatLayoutComponent
  },
  {
    path: 'chat', 
    component: ChatComponent
  },
  {
    path: '**',
    component: ChatLayoutComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
