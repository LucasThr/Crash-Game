import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from './user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user :string=""
  userData =  this.socket.fromEvent<[]>('setUserData');
  constructor(private socket: Socket) {}

  public getName():string{      
    return this.user 
  }

  public setName(name:string){
    this.socket.emit('verifyUser',name)
  }

  public setMoney(money:number){

  }

}
