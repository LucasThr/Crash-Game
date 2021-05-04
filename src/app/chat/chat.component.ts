import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../app.component.css'],
})
export class ChatComponent implements OnInit {
  msg = 'First Protocol';
  newMessage!: string
  messageList: string[] = [];
  user!:string
  constructor(
    // @ViewChild('chat') private myScrollContainer: ElementRef,

    private chatService: ChatService,
    public userService: UserService
  ) {}

  setUser(name:string){
    this.userService.setName(name)
  }

  // name = 'Angular';

  // scrollToElement(el:ElementRef): void {
  //   this.myScrollContainer.nativeElement.scroll({
  //     top: this.myScrollContainer.nativeElement.scrollHeight,

  //     left: 0,

  //     behavior: 'smooth',
  //   });
  // }

  sendMessage() {
    if(!this.newMessage)return
    console.log(this.newMessage);
    this.chatService.sendChat(this.newMessage);
    this.newMessage=""
  }

  ngOnInit(): void {
    this.chatService.chat.subscribe((message) => {
      console.log('message recu');
      this.messageList.push(message);
      this.chatService.getChats(this.messageList);
    });
    this.chatService.chats.subscribe((messages) => {
      console.log('message recu !');
      this.messageList = messages;
    });
  }
}
