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
  constructor(
    public userService:UserService
  ){}

  setName(){
    if(!this.user)return
    this.userService.setName(this.user)
  }
  // ngOnInit(): void {
  //   this.usertest= this.userService.getName()
  // }

}
