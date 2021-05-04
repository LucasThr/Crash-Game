import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat = this.socket.fromEvent<string>('chat');
  chats =  this.socket.fromEvent<string[]>('chats');
  constructor(private socket: Socket) {}

  public sendChat(msg:string){
    console.log("good")
    this.socket.emit('getChat',msg)
  }

  public getChats(msg:string[]){
    this.socket.emit('getChats',msg)
  }

}
