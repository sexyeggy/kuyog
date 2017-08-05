import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatContent } from '../chat-content/chat-content';


@Component({
  selector: 'page-about',
  templateUrl: 'chat.html'
})
export class ChatPage {

  constructor(public navCtrl: NavController) {

  }

  openChatContent(){
    this.navCtrl.push(ChatContent, {})
  }
}
