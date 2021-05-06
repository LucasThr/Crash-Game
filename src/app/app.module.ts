import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BetComponent } from './bet/bet.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ChatComponent } from './chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const port = process.env.PORT || 3000;
// const port = 8000;

// const config: SocketIoConfig = { url: 'localhost:8000', options: {} };
const config: SocketIoConfig = { url: `https://lucasthr-crashgame.herokuapp.com:${port}`, options: {} };

@NgModule({
  declarations: [AppComponent, BetComponent, GraphicsComponent, ChatComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule,SocketIoModule.forRoot(config)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
