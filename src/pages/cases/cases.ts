import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { MakereportPage } from '../makereport/makereport';
import { AlertController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { CasedisplayPage } from '../casedisplay/casedisplay';
import { ReportsPage } from '../reports/reports';
import { MyreportedPage } from '../myreported/myreported';
import { ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';  
/**
 * Generated class for the CasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cases',
  templateUrl: 'cases.html',

})
export class CasesPage {
  caseid: any = "";
  userData = {
    "name": "",
  };
  responseData: any;
  constructor(public navCtrl: NavController, private callNumber: CallNumber, public actionSheetCtrl: ActionSheetController, public authService: AuthService, public loadingController: LoadingController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasesPage');
  }
  public goToReportsPage() {
    this.navCtrl.push(MakereportPage);
  }
  call(){
    this.callNumber.callNumber('0774231343', true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

 action() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Action',
      buttons: [
        {
          text: 'My Reported Cases',
          role: 'destructive',
          icon: 'person',
          handler: () => {
            this.navCtrl.push(MyreportedPage);
          }
        },{
          text: 'Use Reference Number',
          icon: 'code-download',
          handler: () => {
            this.showPrompt();
          }
        }
      ]
    });
    actionSheet.present();
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Case Follow Up',
      message: "Enter Case Reference Number",
      inputs: [
        {
          name: 'id',
          placeholder: 'Case Reference Number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: data => {
            this.caseid = data.id;
            let caseID = localStorage.setItem('caseID',this.caseid);
            this.navCtrl.push(CasedisplayPage);
          }
        }
      ]
    });
    prompt.present();
  }
}
