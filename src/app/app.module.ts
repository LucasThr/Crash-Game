import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { ChatComponent } from './chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GiftComponent } from './gift/gift.component';
import { UserheadbarComponent } from './userheadbar/userheadbar.component';
// const port = process.env.PORT || 3000;
// const port = 3000;
// const config: SocketIoConfig = { url: 'localhost:3000', options: {} };
let hostname = window.location.hostname;
let url = ( hostname === 'localhost' ) ? `${window.location.protocol}//${hostname}:3000` : "https://lucasthr-crashgame.herokuapp.com";
console
const config: SocketIoConfig = { url: `${url}`, options: {} }; 

@NgModule({
  declarations: [AppComponent, GraphicsComponent, ChatComponent, GiftComponent, UserheadbarComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule,SocketIoModule.forRoot(config)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
