import {Component, OnInit, NgModule, ViewChild, ElementRef} from '@angular/core';
import {NgSwitch} from '@angular/common';
import {ChatService} from "./service/chat.service";
import {ChatMessage} from "./models/ChatMessage";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private templateFlg = true;
  private msgValue: string;
  @ViewChild("msgArea", {}) msgArea: ElementRef;
  private messages: Array<ChatMessage>;
  private connecting: string;
  private colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  constructor(private chatService: ChatService) {
  }

  public ngOnInit(): void {
    this.messages = [];
    this.connecting = 'Connecting...';
  }

  login(username: NgForm): void {
    this.templateFlg = !this.templateFlg;
    this.chatService.connect(username.value, this.onMessageReceived);
  }

  public sendMessage(message: NgForm) {
    let value = message.value;
    this.chatService.onSendMessage(value);
    this.msgValue = message.value;
    this.msgValue = null;
  }

  private onMessageReceived = (message) => {
    this.messages.push(message);
    this.connecting = '';
    if (message.type === 'JOIN') {
      message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
      message.content = message.sender + ' left!';
    }
    this.msgArea.nativeElement.scrollTop = this.msgArea.nativeElement.scrollHeight;
  }

  public getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % this.colors.length);
    return this.colors[index];
  }
}
