import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service'; 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../app.component.css'],
})
export class ChatComponent implements OnInit {

  constructor(
    private chatService:ChatService
  ) { }

    send(){
      this.chatService.sendMessage("ok")
    }

  ngOnInit(): void {
  }

}
