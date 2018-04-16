import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { DirectionsPage } from '../../pages/directions/directions';
import { HomePage } from '../../pages/home/home';
import { ReviewPage } from '../../pages/review/review';
import { ProgressPage } from '../../pages/progress/progress';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';  
/**
 * Generated class for the MycasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mycases',
  templateUrl: 'mycases.html',
})
export class MycasesPage {
  userData2 = {
    "user": "",
  };
  ref : any;
  lat : any;
  longt : any;
  id : any;
  objects : any;
  phone : any;
  user_name : any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private callNumber: CallNumber, public actionSheetCtrl: ActionSheetController, public authService: AuthService, public navParams: NavParams, public loadingController: LoadingController) {
    
 
  }

  ionViewDidLoad() {
    this.load();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
     this.load();
     refresher.complete();
    }, 2000);
  }
load(){
  let loader = this.loadingController.create({
    content: "Getting Your Asigned Cases"
  });

  loader.present();
  this.user_name = localStorage.getItem('userName');
  console.log(this.user_name);
  this.userData2.user = this.user_name;
  this.authService.postData(this.userData2, 'cases.php').then((result) => {

    this.objects = result;
  
    loader.dismiss();


  });
}
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Error',
      message: 'Cannot Place Call, Unfortunately the Reporter did not provide a phone number',
      buttons: [

        {
          text: 'OK',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
action(lat: any, longt : string, id : any, number : any, ref : any){
  this.lat = lat;
  this.longt = longt;
  this.id = id;
  this.ref = ref;
  let caseID = localStorage.setItem('caseID', this.id);
  console.log(id); 
  console.log(lat);
  console.log(longt);  

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose an Action',
      buttons: [
        {
          text: 'Open Case Record',
          role: 'destructive',
          icon: 'folder-open',
          handler: () => {
             let ref = localStorage.setItem('ref',this.ref);
            this.navCtrl.push(ReviewPage);
          }
        },{ 
          text: 'Route to Location',          
          icon: 'navigate',
          handler: () => {
           let caseID = localStorage.setItem('caseID',this.id);
           
           let latitude = localStorage.setItem('latitude',this.lat);
           let longitude = localStorage.setItem('longitude',this.longt);
            this.navCtrl.push(DirectionsPage);
          }
        },{
          text: 'Call Reporter',          
          icon: 'call',
           role: 'destructive',
          handler: () => {
           if(number == "")
           {
             this.showConfirm();
           }
           else {
          console.log(number);
            this.callNumber.callNumber(number, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        }
        }, {
          text: 'Update Progress',

          icon: 'briefcase',
          handler: () => {
            this.navCtrl.push(ProgressPage);
         } }, {
          text: 'Close Case',
          icon: 'medical',
          role: 'destructive',
          handler: () => {
            if (number == "") {
              this.showConfirm();
            }
            else {
              console.log(number);
              this.callNumber.callNumber(number, true)
                .then(() => console.log('Launched dialer!'))
                .catch(() => console.log('Error launching dialer'));
            }
          }
        }
      ]
    });
    actionSheet.present();

}
}
