import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MessageBubbleComponent } from './components/message-bubble/message-bubble.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersListComponent } from './users-list/users-list.component';
import { AppRoutingModule } from './app.routing.module';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MessageBubbleComponent,
    ChatComponent,
    UsersListComponent,
    ChatLayoutComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
