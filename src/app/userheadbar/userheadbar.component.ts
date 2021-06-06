import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { User } from '../user'
@Component({
  selector: 'app-userheadbar',
  templateUrl: './userheadbar.component.html',
  styleUrls: ['../app.component.css'],
})
export class UserheadbarComponent implements OnInit {
  money!: number;
  userData!: User[]
  constructor(
    public userService: UserService
    ) {
  }
  ngOnInit(): void {
    //On recupere les informations de l'utilisateur : nom .. money ...
    this.userService.userData.subscribe((userData) =>{
      this.userData=userData
    })
  }

}
