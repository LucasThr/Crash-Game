import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service'
import { Userchat } from '../userchat'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../app.component.css'],
})
export class ChatComponent implements OnInit {
  msg = 'First Protocol';
  newMessage!: string
  messageUser!:Userchat
  messageList: Userchat[] = [];
  user!:string
  constructor(
    // @ViewChild('chat') private myScrollContainer: ElementRef,

    private chatService: ChatService,
    public userService: UserService
  ) {}

  setUser(name:string){
    this.userService.setName(name)
  }

  getCurrentTime(){
    let date = new Date();
    let hours = date.getHours()
    let hour = hours<10 ?  '0' + hours : hours
    let minutes = date.getMinutes()
    let minute = minutes<10 ? '0' + minutes : minutes
    return `${hour}:${minute}`
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
    this.messageUser={username:this.userService.user,message:this.newMessage,time:this.getCurrentTime()}
    this.chatService.sendChat(this.messageUser);
    this.newMessage=""
  }

  ngOnInit(): void {
    this.chatService.chats.subscribe((messages) => {
      this.messageList = messages;
    });
  }
}
