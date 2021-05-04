import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Userchat } from './userchat'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat = this.socket.fromEvent<string>('chat');
  chats =  this.socket.fromEvent<Userchat[]>('chats');
  constructor(private socket: Socket) {}

  public sendChat(msg:Userchat){
    this.socket.emit('getChat',msg)
  }

  public getChats(msg:Userchat[]){
    this.socket.emit('getChats',msg)
  }

}
