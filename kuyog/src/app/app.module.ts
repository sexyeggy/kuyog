import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { EventPage } from '../pages/event/event';
import { EventContent } from '../pages/event-content/event-content';
import { Filter } from '../pages/filter/filter';
import { AddEvent } from '../pages/add-event/add-event';
import { ChatPage } from '../pages/chat/chat';
import { GroupPage } from '../pages/group/group';
import { UserPage } from '../pages/user/user';
import { GroupContent } from '../pages/group-content/group-content';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EventPage,
    EventContent,
    Filter,
    AddEvent,
    ChatPage,
    GroupPage,
    UserPage,
    GroupContent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EventPage,
    EventContent,
    Filter,
    AddEvent,
    ChatPage,
    GroupPage,
    UserPage,
    GroupContent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
