import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BetsService {
  time = this.socket.fromEvent<number>('timer');

  constructor(public socket: Socket) {}





  getMessage() {
    console.log("g")
    this.socket.on('msg',() =>{
      console.log('pppp')
    })
    // return this.socket.fromEvent<any>('msg').pipe(map((data) => data.msg));
  }
  start(): void {
    this.socket.emit('msg','ok')
    console.log('ok');
  }
}
