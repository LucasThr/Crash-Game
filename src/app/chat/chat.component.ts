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

    // send(){
    //   this.chatService.sendMessage()
    // }

    sendMessage() {
      console.log(this.newMessage)
      this.chatService.sendChat(this.newMessage);
      // console.log(this.messageList)
    }

  ngOnInit(): void {
    // this.chatService.getEventListener().subscribe(() => console.log(123));
    this.chatService.chat
      .subscribe((message) => {
        // console.log('message recu')
        this.messageList.push(message);
      });
    // this.sendMsg(this.msg);
    this.chatService.getMessage().subscribe(msg => {
        console.log('Incoming msg');
      });

  }


  test() {
    console.log(this.messageList);
 }

}
