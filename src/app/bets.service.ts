import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { BetRecord } from './bet';

@Injectable({
  providedIn: 'root',
})
export class BetsService {
  time = this.socket.fromEvent<number>('timer');
  canBet = this.socket.fromEvent<boolean>('canBet');
  readyToPlay = this.socket.fromEvent<boolean>('connected');
  bets =  this.socket.fromEvent<BetRecord[]>('bets');
  error =  this.socket.fromEvent<string>('errorbet');
  multiplierHistory = this.socket.fromEvent<string[]>('multiplierHistory')
  constructor(public socket: Socket) {}

  public sendBet(bet:BetRecord){
    console.log(bet)
    this.socket.emit('sendBet',bet)
  }

  public sendClaim(claim:boolean){
    this.socket.emit('sendClaim',claim)
  }



}
