import { Component } from '@angular/core';
import { ViewController, NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

/**
 * Generated class for the GroupAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-post',
  templateUrl: 'group-post.html',
})

export class GroupPost {

  key: any;
  group: any;
  post: any;
  user: any;
  label: any;
  postKey: any;
  groupKey: any;
  
  host = '';
  poster = '';
  timestamp = '';
  datetime = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public firebaseService:FireBaseService, public viewCtrl: ViewController, public params: NavParams) {
        this.host = firebaseService.user;
        this.user = firebaseService.user;
        //this.post = this.firebaseService.getPost(this.key);
        this.key = navParams.get('param1');
        this.label = navParams.get('label');
        this.postKey = navParams.get('tapokPost');
        this.groupKey = navParams.get('tapokGroup');
        //if(this.postKey != undefined)
				  //this.editPostInfo();
  }

  addPost(){
      this.group={
      "post": this.post,
      "poster": this.user,
      "timestamp": 0-Date.now(),
      "datetime": Date.now()
    }

    if(this.label == "Add Post")
			this.firebaseService.addPost(this.group, this.key);
    //this.firebaseService.addPost(this.group, this.key);
    let alert = this.alertCtrl.create({
			title: 'Post Sent!',
			buttons: [ 'OK' ]
    });
    alert.present();
    this.dismiss();
  }

  editPost(post){
      this.post={
        "post": this.post,
        "datetime": Date.now()
      }
      console.log(this.postKey.$key);
      this.firebaseService.editPosts(this.groupKey.$key, this.postKey.$key, this.post);
      let alert = this.alertCtrl.create({
        title: 'Changes Saved!',
        buttons: [ 'OK' ]
      });
      alert.present();
      this.dismiss();
  }

  /*editPostInfo(){
		this.key = this.post.$key;
		this.post = this.post.post;
	}*/

  dismiss() {
		this.viewCtrl.dismiss();
  }
  
  cancel(){
		this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('Test');
  }

}