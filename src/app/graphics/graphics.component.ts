import { Component, OnInit } from '@angular/core';
import { BetRecord } from '../bet';
import { BetsService } from '../bets.service';
import { UserService } from '../user.service'
import { User } from '../user'

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['../app.component.css'],
})
export class GraphicsComponent implements OnInit {
  money!: number;
  mise!: number;
  bets: BetRecord[] = [];
  canBet!: boolean;
  username!: string
  error!:string
  time!: number;
  isCrash: boolean = false;
  isWithdraw: boolean = false;
  miseOnTable: number = 0;
  readyToPlay!:boolean;
  chronoBar!:number;
  barLenght!:number
  timeToShow:string='1.00'
  multiplierHistory:string[]=[]
  constructor(public betService: BetsService,
    public userService: UserService
    ) {
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

  changeColorOfMulti(multi:string):string{
    let colors=['yellow','red','green','blue','purple']
    // console.log(multi.toString().slice(-1))
    let num=Number(multi)
    let ran:number=0
    if (num>1.30) ran=3
    if (num>1.60) ran=2
    if (num>1.90) ran=4
    if (num>2.30) ran=1


    
    return colors[ran]
  }

  addBet(initial: number, value: number, isLose?: boolean) {
    this.betService.sendBet({
      user:this.username,
      time:this.getCurrentTime(),
      initial: initial,
      value: value,
      gain: this.isWithdraw ?  this.fixedDecimal(initial * value) : 0,
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

  getDecimalWithZero(number:number):string{
    let display:string
    display= number.toString()
    display=Number.parseFloat(display).toFixed(2)
    return display
  }

  getCurrentTime(){
    let date = new Date();
    let hours = date.getHours()
    let hour = hours<10 ?  '0' + hours : hours
    let minutes = date.getMinutes()
    let minute = minutes<10 ? '0' + minutes : minutes
    return `${hour}:${minute}`
  }

  startChronoBar(){
    this.chronoBar=window.setInterval(()=>{
      this.barLenght-=1
    },100)
  }
  
  ngOnInit(): void {
    //Recupere l'historique des bets
    this.betService.bets.subscribe((bets) => {
      this.bets = bets;
    });


    //recupere le temps du chrono du serveur vers l'utilisateur
    this.betService.time.subscribe((time) => {
      this.time = time;
      this.timeToShow=time.toString()
      this.timeToShow=Number.parseFloat(this.timeToShow).toFixed(2)
    });

    //
    this.betService.readyToPlay.subscribe((verify) => {
      console.log("read")
      this.readyToPlay = verify;
    });

    //
    this.betService.canBet.subscribe((canBet) => {
      this.canBet = canBet;
      if (this.canBet == true) {
        if(this.isWithdraw==false && this.miseOnTable){
          this.addBet(this.mise, this.time);
          
        }
        this.miseOnTable = 0;
        this.barLenght=100
        this.isWithdraw=false
        console.log(true)
        this.startChronoBar()
      }
      if (this.canBet == false) {
        clearInterval(this.chronoBar)
        this.barLenght=0
      }
    });

    this.betService.error.subscribe((error)=>{
      this.error=error
    })

    //Recupere la liste des multiplicateur precedent
    this.betService.multiplierHistory.subscribe((multi)=>{
      this.multiplierHistory=multi
    })



    //On recupere les informations de l'utilisateur : nom .. money ...
    this.userService.userData.subscribe((userData) =>{
      console.log(userData)
      for (const [key, value] of Object.entries(userData)) {
        if(key=="username"){ this.username = value}
        if(key =="money") this.money=value
      }
    })
  }
}

