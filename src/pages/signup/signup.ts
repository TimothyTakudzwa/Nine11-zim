
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Tabs2Page } from '../tabs2/tabs2';
import { ReportsPage } from '../reports/reports';
import { LoadingController } from 'ionic-angular';
import { ReportsResponse } from "../../providers/request/ReportsResponse";
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData: any;
  userData = { "name": "", "phone": "", "password": "", "username": "", "location": "" };

  constructor(public navCtrl: NavController, public authService: AuthService, public loadingController: LoadingController) {
  }

  signup() {
    let loader = this.loadingController.create({
      content: "Loading..."
    });
    loader.present();
    this.authService.postData(this.userData, 'login.php').then((result) => {

      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.status == 1) {
        // console.log(this.responseData);
        // localStorage.setItem('userData',  JSON.stringify(this.responseData));
        loader.dismiss();
        this.navCtrl.push(ReportsPage);
      }
      else { console.log("User already exists"); }
    }, (err) => {
      // Error log
    });

  }
  guest() {
    this.navCtrl.push(Tabs2Page);
  }
 
}