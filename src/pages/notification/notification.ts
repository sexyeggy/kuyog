import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { Badge } from '@ionic-native/badge';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  Notifs: any;
  notifs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  
    public firebaseService: FireBaseService, public modalCtrl: ModalController, public badge: Badge,
    public tabs: TabsPage, public alertCtrl: AlertController) {
    this.Notifs = this.firebaseService.getNotif();
    
    this.Notifs.subscribe(snapshot => {
      if(snapshot.length == 0)
        this.notifs = false;
      else
        this.notifs = true;
    });
  }

  ionViewDidLoad() {
    this.clearBadges();
  }

  ionViewDidEnter(){
    this.clearBadges();
    this.tabs.getBadges();
  }

  ionViewWillEnter(){
    this.clearBadges();
  }

  openSearch(){
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }
  
  openMap(){
    let modal = this.modalCtrl.create('MapPage');
    modal.present();
  }

  async clearBadges(){
    try{
      let badge = await this.badge.clear();
    }catch(e){
      alert(e);
    }
  }

  clearNotifs(){
    let confirm = this.alertCtrl.create({
      title: 'Notifications Cleared',
      buttons: ['Ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Clear Notifications?',
      buttons: [ 
        {
          text: 'Yes',
          handler: () => {					
            this.firebaseService.clearNotifs();
            confirm.present();
            this.clearBadges();
          }
        },
        {
          text: 'No',
        }
      ]
    });
    alert.present();
  }
}
