import { Component, OnInit } from '@angular/core';
import { from, Observable, of, TimeoutError } from 'rxjs';
import { Bet } from '../bet';
import { BetRecord } from '../bet';
import { Socket } from 'ngx-socket-io';
import { BetsService } from '../bets.service';
@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['../app.component.css'],
})
export class GraphicsComponent implements OnInit {
  money: number = 100;
  mise!: number;
  bets: BetRecord[] = [];
  canBet!: boolean;
  // bet: Bet = { id: 1, value: 0 };
  time!: number;
  timer!: number;
  isCrash: boolean = false;
  isWithdraw: boolean = false;
  miseOnTable: number = 0;
  readyToPlay!:boolean;
  chronoBar!:number;
  barLenght!:number
  timeToShow:string='1.00'
  displayAllScore:boolean=false
  constructor(public betService: BetsService) {
    this.time = 1.00;
  }

  onMise(): void {
    if (!this.mise) return;
    if (this.money - this.mise < 0) return;
    this.money = this.fixedDecimal(this.money - this.mise);
    this.miseOnTable = this.mise;
    this.isCrash = false;
  }

  addMoney(time: number) {
    // Number(this.money+= time * this.mise).toFixed(2);
    this.money = Number((this.money + time * this.mise).toFixed(2));
  }

  addBet(initial: number, value: number, isLose?: boolean) {
    this.bets.push({
      initial: initial,
      value: value,
      gain: isLose ? 0 : this.fixedDecimal(initial * value),
    });
  }

  onRetrait(): void {
    if (!this.miseOnTable) return;
    this.isWithdraw = true;
    console.log('RETRAIT');
    this.addMoney(this.time);
    this.addBet(this.mise, this.time);
  }

  cancelMise() {
    this.money += this.miseOnTable;
    this.miseOnTable = 0;
  }

  fixedDecimal(number: number): number {
    return Number(number.toFixed(2));
  }

  startChronoBar(){
    this.chronoBar=window.setInterval(()=>{
      this.barLenght-=1
    },100)
  }
  
  ngOnInit(): void {
    this.betService.time.subscribe((time) => {
      this.time = time;
      this.timeToShow=time.toString()
      this.timeToShow=Number.parseFloat(this.timeToShow).toFixed(2)
    });
    this.betService.readyToPlay.subscribe((verify) => {
      this.readyToPlay = verify;
    });

    this.betService.canBet.subscribe((canBet) => {
      this.canBet = canBet;
      if (this.canBet == true) {
        this.miseOnTable = 0;
        this.barLenght=100
        this.isWithdraw==false
        this.startChronoBar()
      }
      if (this.canBet == false) {
        clearInterval(this.chronoBar)
        this.barLenght=0
      }
    });
  }
}

