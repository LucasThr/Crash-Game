import { Component, OnInit } from '@angular/core';
import { BetsService } from '../bets.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  claim:boolean = false;

  constructor(public betService: BetsService) { }


  
  onClaim = () => {
    this.claim=!this.claim
    this.betService.sendClaim(true)
  }


  ngOnInit(): void {
  }

  
}
