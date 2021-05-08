import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Userchat } from './userchat'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats =  this.socket.fromEvent<Userchat[]>('chats');
  constructor(private socket: Socket) {}

  public sendChat(msg:Userchat){
    this.socket.emit('sendChat',msg)
  }



}
