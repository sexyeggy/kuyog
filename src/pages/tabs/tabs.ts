import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Rx';
import { Badge } from '@ionic-native/badge';
import { FirebaseApp } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'TapokPage';
  tab2Root = 'EventPage';
  tab3Root = 'GroupPage';
  tab4Root = 'NotificationPage';
  tab5Root = 'UserPage';

  selectedTab: any;
  key: any;
  first=true;
  bdge:any;

  username: any;
  notifCount = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public firebaseService: FireBaseService,  public geolocation: Geolocation,
    public firebaseApp: FirebaseApp, public badge: Badge) {
    this.username = navParams.get('username');
    this.key = navParams.get('key');
    this.firebaseService.getUser();
    this.notifCount = 0;
    this.firebaseService.getNotif().subscribe(snapshots => {
      snapshots.forEach(snap => {
        console.log(snap);
        if(snap.checked == null)
          this.notifCount++;
        console.log(this.notifCount);
      });
    });


    Observable.interval(10000)
    .subscribe((val) => { 
      this.geolocation.getCurrentPosition().then((position) => {
        var coord = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        this.firebaseService.updateUserLocation(coord);
      })
    });

    this.firebaseApp.database().ref("notifications/").on('value', snapshot => {
      if (!this.first){
        this.increaseBadges();
      }
      else{
        this.getBadges();
        this.first=false;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    /*if(this.selectedTab == 2){
      console.log('test');
      this.navCtrl.setRoot('TapokContent', { param1: this.key });
    }*/
  }

  async increaseBadges(){
    try{
      let badge = await this.badge.increase(Number(1));
      this.bdge = badge;
    }catch(e){
      alert(e);
    }
  }

  async getBadges(){
    try{
      let badgeAmount = await this.badge.get();
    }catch (e){
      alert(e);
    }
  }
}
