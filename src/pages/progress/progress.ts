import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ReactionsPage } from '../../pages/reactions/reactions';
import { ViewcommentsPage } from '../../pages/viewcomments/viewcomments';
import  { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {
  public objects: any;
  status: any;
  color: any;
  responseData: any;
  userData = {
    "case_id": ""
  };
  userData2 = {
     "name": "", "message": "", "status": "",
  };
  userData3 = {
    "user_id": "", "id": "", "increment": "", "username": "",
  };
  user_id: any;
  userName: any;
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingController: LoadingController, public navCtrl: NavController, public authService: AuthService, public http: Http, private popoverCtrl: PopoverController) {
    window.addEventListener("contextmenu", (e) => { e.preventDefault(); });
    this.objects = null;
    this.status = 1;
    this.color = "secondary";
    
    this.userData2.name = localStorage.getItem('userName');
    this.userData2.status = localStorage.getItem('caseID');
    this.userData3.user_id = localStorage.getItem('userID');
    this.userData3.username = localStorage.getItem('userName');


    let loader = this.loadingController.create({
      content: "Getting Ready"
    });

    loader.present();
    this.userData.case_id = localStorage.getItem('caseID');
    this.authService.postData(this.userData, 'casedetails.php').then((result) => {
      loader.dismiss();
      this.objects = result;
    });

       

    
    this.userName = localStorage.getItem('userName');
    console.log(this.userName)

  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplaintsPage');
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Like Successful',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
  presentToast2() {
    let toast = this.toastCtrl.create({
      message: 'You already liked this post',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
  signup() {
    let loader = this.loadingController.create({
      content: "Submitting Complaint"
    });
    this.userData2.name = this.userName;
    loader.present();
    this.authService.postData(this.userData2, 'casedetailsupload.php').then((result) => {

      this.responseData = result;
      this.responseData = result;
      loader.dismiss();
      this.navCtrl.push(ProgressPage);

      this.showAlert();


    });

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

  like(name: any) {
    let loader = this.loadingController.create({
      content: "Loading..."
    });

    loader.present();

    this.userData3.id = name;
    this.userData3.increment = 'upvotes';
    this.authService.postData(this.userData3, 'complaints.php').then((result) => {

      this.responseData = result;
      loader.dismiss();
      console.log(this.user_id);
      if (this.responseData.status == 0) {
        console.log(this.responseData.status_message);
        this.presentToast2();
      }
      else {
        this.presentToast();
      }
      this.navCtrl.push(ProgressPage);


      // else { console.log("User already exists"); }
    }, (err) => {
      // Error log
    });
    console.log(name);

  }
  dislike(name: any) {
    let loader = this.loadingController.create({
      content: "Loading..."
    });

    loader.present();

    this.userData3.id = name;
    this.userData3.increment = 'downvotes';
    this.authService.postData(this.userData3, 'complaints.php').then((result) => {

      this.responseData = result;
      loader.dismiss();
      console.log(this.user_id);
      if (this.responseData.status == 0) {
        console.log(this.responseData.status_message);
        this.presentToast2();
      }
      else {
        this.presentToast();
      }
      this.navCtrl.push(ProgressPage);


      // else { console.log("User already exists"); }
    }, (err) => {
      // Error log
    });
    console.log(name);

  }

}

