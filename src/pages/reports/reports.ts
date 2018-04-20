import { Component } from '@angular/core';
import  { NavController }  from  'ionic-angular';
import  { TabsPage }  from  '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { MycasesPage } from '../mycases/mycases';
import { PolicePage } from '../police/police';
import { Tabs2Page } from '../tabs2/tabs2';
import  { LoginPage }  from  '../login/login';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ReportsResponse } from "../../providers/request/ReportsResponse";
import  { AuthService }  from  '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  responseData: any;
  user_id : any;
  userData = { "name": "", "phone": "" };
   map: any;
  todo: FormGroup;
  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController,  public authService: AuthService, public loadingController: LoadingController) {
    this.todo = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),   
    });
 
  }



  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'Invalid Username/Password',
      buttons: [
        {
          text: 'Retry',
          handler: data => {

            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sign-up',
          handler: data => {

            this.navCtrl.push(SignupPage);
          }
        }
      ]
    });
    alert.present();
  }
     
  signup() {
    let loader = this.loadingController.create({
      content: "Loading..."
    });  
loader.present();
    this.authService.postData(this.userData, 'api.php').then((result) => {
      
      this.responseData = result;
      console.log(this.responseData);

      this.responseData = result;
      if (this.responseData.status_message == null) {
     
        // console.log(this.responseData);
        // localStorage.setItem('userData',  JSON.stringify(this.responseData));
        loader.dismiss();
        
        this.showAlert();
      } 
      else {
        loader.dismiss();
        this.user_id = this.responseData.user_id;
        console.log(this.user_id);
        let userID = localStorage.setItem('userID', this.user_id);
        let userName = localStorage.setItem('userName', this.responseData.status_message);
        this.user_id = localStorage.getItem('userID');
        this.navCtrl.push(TabsPage);}
    }, (err) => {
      // Error log
    });

  }
guest(){
  this.navCtrl.push(Tabs2Page);
}
directions(){
  this.navCtrl.push(PolicePage);
}
  login() {
    //Login page link
    this.navCtrl.push(SignupPage);
  }
}