
import { Component } from '@angular/core';
import { NavController, PopoverController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ReactionsPage } from '../../pages/reactions/reactions';
import {Http, Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
   
})
export class AboutPage {
  public objects: any;
  status: any;
  upvotes : any;
  downvotes : any; 
  user_id: any;
  color : any;
  responseData2: any;
  case_id : any;
  userData = {
    "id": "", "increment": "", "user_id": "",
  };
  userData2 = {
    "user_id": ""
  };
  responseData: any;
  results: any;
  name: any;
  constructor(public toastCtrl: ToastController, public loadingController: LoadingController,public navCtrl: NavController, public authService: AuthService, public http: Http ,private popoverCtrl: PopoverController) {
    window.addEventListener("contextmenu", (e) => { e.preventDefault(); });
    this.objects = null;
    this.status= 1;
    this.color = "secondary";
    this.user_id = localStorage.getItem('userID');
    let loader = this.loadingController.create({
      content: "Getting Alerts"
    });
    loader.present();
    this.http.get('http://www.houseofsmiles.co.zw/nine11/api/api.php')
      .map(res => res.json())
      .subscribe(data => {
        this.likes();
        loader.dismiss();
        this.objects = data; 
        
       });
   

  };
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
  showReactions(ev) {

    let reactions = this.popoverCtrl.create(ReactionsPage);

    reactions.present({
      ev: ev
    });

  }
likes(){
  this.userData2.user_id = this.user_id;
  this.authService.postData(this.userData2, 'alerts2.php').then((res) => {
    this.responseData2 = res;
    // else { console.log("User already exists"); }
  }, (err) => {
    // Error log
  });
  console.log(name);

}
  like(name : any) {
    let loader = this.loadingController.create({
      content: "Loading..."
    });

    loader.present();
    this.userData.user_id = this.user_id
    this.userData.id = name;
    this.userData.increment = "upvotes";
    this.authService.postData(this.userData, 'alerts.php').then((result) => {

        this.responseData = result;
        loader.dismiss();
        console.log(this.user_id);
        if (this.responseData.status == 0) {
          console.log(this.responseData.status_message);
          this.presentToast2();
        } 
         else{
          this.presentToast();
        }
        this.navCtrl.push(AboutPage);
       
     
      // else { console.log("User already exists"); }
    }, (err) => {
      // Error log
    });
    console.log(name);
    
  }

}
