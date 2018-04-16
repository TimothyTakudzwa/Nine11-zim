import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ReactionsPage } from '../../pages/reactions/reactions';

import  { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ViewcommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewcomments',
  templateUrl: 'viewcomments.html',
})
export class ViewcommentsPage {
  userData = {
    "id": ""
  };
  userData2 = {
    "user_id": "", "username": "", "responce": "", "post_id": "",
  };
  objects: any; 
  id: any;
  message: any;
  upvotes: any;
  downvotes: any;
  username: any;
  user_id : any;
  date_submitted : any;
  responseData: any;
  responseData2: any;
  
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingController: LoadingController, public navCtrl: NavController, public authService: AuthService, public http: Http, private popoverCtrl: PopoverController) {
    window.addEventListener("contextmenu", (e) => { e.preventDefault(); });}
  ionViewDidLoad() {
    this.load();
    this.userData2.user_id = localStorage.getItem('userID');
    this.userData2.username = localStorage.getItem('userName');
    this.userData2.post_id = localStorage.getItem('complaint')
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Complaint Submitted',
      buttons: [
        {
          text: 'OK',
          handler: data => {

            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
  signup() {
    let loader = this.loadingController.create({
      content: "Submitting Complaint"
    });
    loader.present();
    this.authService.postData(this.userData2, 'api3.php').then((result) => {

      this.responseData = result;
      this.responseData = result;
      loader.dismiss();
      this.navCtrl.push(ViewcommentsPage);

      this.showAlert();


    });

  }
  load(){
    this.userData.id = localStorage.getItem('complaint');

    let loader = this.loadingController.create({
      content: "Loading Post...."
    });

    loader.present();
  
    this.authService.postData(this.userData, 'comments.php').then((result) => {

      this.responseData = result;
      loader.dismiss();
      this.message = this.responseData.status_message;
      this.user_id = this.responseData.user_id;
      this.username = this.responseData.username;
      this.downvotes = this.responseData.downvotes;
      this.upvotes = this.responseData.upvotes;
      this.date_submitted = this.responseData.date_submitted;
      this.id = this.responseData.id;
      let responseid = localStorage.setItem('responseid', this.id);
      this.responses();
    });
   
    console.log(name);
  }
  responses(){
      this.userData.id = localStorage.getItem('responseid');
      let loader = this.loadingController.create({
        content: "Getting Post Comments...."
      });

      loader.present();
    
      this.authService.postData(this.userData, 'comments2.php').then((result) => {

        this.objects = result;
        loader.dismiss();
      });
      console.log(name);
  }
}
