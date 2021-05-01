import { Component, OnInit } from '@angular/core';
import { Bet } from '../bet';
@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['../app.component.css']
})
export class BetComponent implements OnInit {
  bets: Bet[]=[]
  bet:Bet={id:1,value:0};

  constructor() { }

  newBet(id:number,value:number):Bet{
    this.bet={id:id,value:value}
    return this.bet
  }

  onMise():void{
    this.bets.push(this.newBet(4,4))
  }

  onRetrait():void{
    this.bets=[];
    this.bet.value=0
  }

  ngOnInit(): void {
  }

}
