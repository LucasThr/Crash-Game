import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BetsService {
  time = this.socket.fromEvent<number>('timer');
  canBet = this.socket.fromEvent<boolean>('canBet');
  constructor(public socket: Socket) {}

}
