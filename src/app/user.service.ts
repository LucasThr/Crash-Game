import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user :string=""
  constructor(
  ) { }

  public getName():string{      
    return this.user 
  }

  public setName(name:string){
    this.user=name
  }

}
