import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import { ReactionsPage } from '../../pages/reactions/reactions';
import { ViewcommentsPage } from '../../pages/viewcomments/viewcomments';
import  { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the AnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {
name : any;
  public objects: any;
responseData: any;
userData3 = {
  "user_id": "", "id": "", "location": "",  "case_type": "", "increment": "", "username": "",
};
  userData2 = {
    "location": "",
  };
user_id: any;
userData = { "user_id": "", "crime_type": "", "description": "", "location": "", "username": "" };
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public http: Http, private popoverCtrl: PopoverController, public authService: AuthService, public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController) {
    this.objects = null;
    this.name =localStorage.getItem('name');
    this.userData.user_id = localStorage.getItem('userID');
    this.userData3.user_id = localStorage.getItem('userID');
    this.userData.location = localStorage.getItem('name');
    this.userData2.location = localStorage.getItem('name');
    this.userData3.location = localStorage.getItem('name');
    this.userData.username = localStorage.getItem('userName');
    console.log(this.name)

    

  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Getting Ready"
    });

    loader.present();
    this.authService.postData(this.userData2, 'test2.php').then((result) => {

      this.objects = result;
        loader.dismiss();
        

      });
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
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Thank you for your Help, You can now proceed to like or dislike what others said',
      buttons: [
        {
          text: 'OK',
          handler: data => {

            console.log('Cancel clicked');
          }
        },
       
      ]
    }); 
    alert.present();
  }
  like(name: any, case_type : string) {
    let loader = this.loadingController.create({
      content: "Loading..."
    });
console.log(case_type);
    loader.present();

    this.userData3.id = name;
    this.userData3.case_type = case_type;
    this.userData3.increment = 'upvotes';
    this.authService.postData(this.userData3, 'complaints3.php').then((result) => {

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
      this.navCtrl.push(AnalysisPage);


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
    this.authService.postData(this.userData3, 'complaints3.php').then((result) => {

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
      this.navCtrl.push(AnalysisPage);


      // else { console.log("User already exists"); }
    }, (err) => {
      // Error log
    });
    console.log(name);

  }
  signup() {
    let loader = this.loadingController.create({
      content: "Loading..."
    });
    loader.present();
    this.authService.postData(this.userData, 'analysis.php').then((result) => {

      this.responseData = result;
      console.log(this.responseData);
        loader.dismiss();
        this.navCtrl.push(AnalysisPage);
     
    }, (err) => {
      // Error log
    });

  }

}
