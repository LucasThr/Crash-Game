import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage() {
    this.socket.emit('welcome');
    console.log('emit');

  }

  public getMessage() {
    return this.socket.fromEvent<any>('message').pipe(map((data) => data.msg));
  }

  public getEventListener() {
    return this.socket.fromEvent('welcome');
  }

  // public getMessages = () => {
  //   return Observable.create((observer) => {
  //           this.socket.on('new-message', (message) => {
  //               observer.next(message);
  //           });
  //   });
  // }
}
