import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CasesPage } from '../cases/cases';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CasedisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 

@Component({
  selector: 'page-casedisplay',
  templateUrl: 'casedisplay.html',
})
export class CasedisplayPage {
  userData = {
    "case_id": "",
  };
  responseData: any;
  results: any;
  name: any;
  case_id : any; 
  age : any;
  sex : any;
  address: any;
  case_type : any;
  case_description : any;
  reported_at : any;
  date : any;
  date_closed : any;
  details : any;
  assigned_to : any;
  case_status : any; 
  location : any;





  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public authService: AuthService, public loadingController: LoadingController, public navParams: NavParams) {
    this.case_id =localStorage.getItem('caseID');
    console.log(this.case_id);
    
  }
  
  ionViewDidLoad() {
    this.signup();
  }
showAlert() {
    let alert = this.alertCtrl.create({
      title: 'No Results Found',
      subTitle: 'The case with the Reference Number you provided could not be found, Please re-confirm the Reference Number and Try Again',
      buttons: ['OK']
    });
    alert.present();
  }
  signup() {
    let loader = this.loadingController.create({
      content: "Loading..."
    });

    loader.present();
    
    this.userData.case_id = this.case_id;    
    this.authService.postData(this.userData, 'repo.php').then((result) => {

      this.responseData = result;
      if (this.responseData.case_id == null) {
        this.navCtrl.push(CasesPage);
        loader.dismiss();
        this.showAlert();

      } 
    else {
       this.results = this.responseData;
       this.name = this.results.name;
       this.age = this.results.age;
       this.address = this.results.address;
       this.assigned_to = this.results.assigned_to;
       this.case_description = this.results.case_description;
       this.sex = this.results.sex;
       this.case_type = this.results.case_type;
       this.location = this.results.location;
       this.date = this.results.date;
       this.date_closed = this.results.date_closed;
       this.assigned_to = this.results.assigned_to;
        this.case_status = this.results.case_status;
        this.details = this.results.details;
        this.reported_at = this.results.reported_at;
      
        loader.dismiss();
      }
      // else { console.log("User already exists"); }
    }, (err) => {
      // Error log
    });

  }


}
