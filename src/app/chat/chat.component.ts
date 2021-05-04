import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service'; 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../app.component.css'],
})
export class ChatComponent implements OnInit {
  msg = 'First Protocol'
  newMessage:string="MESSAGE"
  messageList:  string[] = [];
  constructor(
    private chatService:ChatService
  ) { }

    sendMessage() {
      console.log(this.newMessage)
      this.chatService.sendChat(this.newMessage);
    }


  ngOnInit(): void {
    this.chatService.chat
      .subscribe((message) => {
        console.log('message recu')
        this.messageList.push(message);
        this.chatService.getChats(this.messageList)
      });
      this.chatService.chats
      .subscribe((messages) => {
        console.log('message recu !')
        this.messageList=messages
      });

  }


  

}
