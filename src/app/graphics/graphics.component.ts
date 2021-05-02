import { Component, OnInit } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { Bet } from '../bet';
import { BetRecord } from '../bet';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['../app.component.css'],
})
export class GraphicsComponent implements OnInit {
  money:number=100;
  mise!:number
  bets:BetRecord[] = [{initial:10,value:15,gain:200},{initial:10,value:15,gain:200},{initial:10,value:15,gain:200}];
  // bet: Bet = { id: 1, value: 0 };
  time!: number;
  timer!: number;
  isCrash: boolean = false;
  isWithdraw: boolean = false;

  constructor() {
    this.time = 1.0;
  }

  start() {
    var crash: number;
    var max: number;
    this.isWithdraw=false
    max = (Math.floor(Math.random() * (500 - 0) + 0) / 100) * 100;
    this.timer = window.setInterval(() => {
      if (this.time > 0 && this.time < 2){
          this.time=Number(Number((Math.round((this.time += 0.01) * 100) / 100)).toFixed(2))
       }
      if (this.time < 5 && this.time >= 2) {
        this.time=Number(Number(this.time += 0.04).toFixed(2))

        max = max / 2;
      }
      if (this.time < 100 && this.time >= 5) {
        this.time=Number(Number(this.time += 0.08).toFixed(2))
        max = max / 2;
      }
      crash = (Math.floor(Math.random() * (max - 1) + 1) / 100) * 100;
      console.log(crash);
      if (crash == 1) {
        clearTimeout(this.timer);
        this.isCrash = true;

      }
    }, 100);
  }

  stop() {
    clearTimeout(this.timer);
  }

  onMise(): void {
    if(!this.mise) return
    this.money-=this.mise
    this.isCrash=false
    this.time=1.00
    this.start();
   
  }

  addMoney(value:number){
    this.money+=(value*this.mise)
  }

  addBet(initial:number,value:number,gain:number){
    this.bets.push({initial:10,value:value,gain:200})
  }


  onRetrait(): void {
    if(this.isWithdraw)return
    this.isWithdraw=true
    console.log("RETRAIT")
    this.addMoney(this.time)
    this.addBet(10,this.time,10)
  }

  ngOnInit(): void {}
}
