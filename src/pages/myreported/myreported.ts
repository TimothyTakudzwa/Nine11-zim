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
 * Generated class for the MyreportedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myreported',
  templateUrl: 'myreported.html',
})
export class MyreportedPage {
  userData2 = {
    "user": "",
  };
  ref: any;
  lat: any;
  longt: any;
  id: any;
  objects: any;
  phone: any;
  user_name: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private callNumber: CallNumber, public actionSheetCtrl: ActionSheetController, public authService: AuthService, public navParams: NavParams, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.load();
  }
  load() {
    let loader = this.loadingController.create({
      content: "Getting Your Reported Cases"
    });

    loader.present();
    this.user_name = localStorage.getItem('userName');
    console.log(this.user_name);
    this.userData2.user = this.user_name;
    this.authService.postData(this.userData2, 'reported.php').then((result) => {

      this.objects = result;

      loader.dismiss();


    });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Success',
      message: 'Case Closed Succesfully',
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
  action(lat: any, longt: string, id: any, number: any, ref: any) {
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
            let ref = localStorage.setItem('ref', this.ref);
            this.navCtrl.push(ReviewPage);
          }        
        }, {
          text: 'Update Progress',

          icon: 'briefcase',
          handler: () => {
            this.navCtrl.push(ProgressPage);
          }
        }, {
          text: 'Close Case',
          role: 'destructive',
          icon: 'medical',
          handler: () => {
            let loader = this.loadingController.create({
              content: "Closing Case"
            });

            loader.present();
            this.user_name = localStorage.getItem('userName');
            console.log(this.user_name);
            this.userData2.user = this.ref;
            this.authService.postData(this.userData2, 'close.php').then((result) => {    
              loader.dismiss();
              this.showConfirm();
            });
          }
        }
        
      ]
    });
    actionSheet.present();

  }
}
