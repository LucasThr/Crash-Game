import { Component } from '@angular/core';
import { UserService } from './user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RocketMoney';
  user!:string
  connected:boolean=false
  constructor(
    public userService:UserService
  ){}

  setName(){
    if(!this.user)return
    console.log('ok')
    this.connected=true
    this.userService.setName(this.user)
  }
  ngOnInit(): void {
    this.userService.userData.subscribe((userData) =>{
      console.log(userData)
      for (const [key, value] of Object.entries(userData)) {
        if(key=="username"){ this.user = value}
      }
    })
  }

}
