import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat = this.socket.fromEvent<string>('chat');

  constructor(private socket: Socket) {}

  obs!:Observable<any>

  // sendMessage() {
  //   this.socket.emit('welcome');
  //   console.log('emit');
  // }

  public getMessage() {
    return this.socket.fromEvent<any>('msg').pipe(map((data) => data.msg));
  }
 
  public sendChat(msg:string){
    this.socket.emit('getChat',msg)
  }

  public sendMessage(message:string) {
    console.log("ok")
    this.socket.emit('new-message', message);
}


  

  time = new Observable<string>(observer => {
    this.socket.on('new-message', (message:string) => {
      observer.next(message);
      console.log("time")
  });
  });

  public getMessages = () => {
    return this.time
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
