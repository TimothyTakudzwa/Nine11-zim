import { ReportsPage } from '../reports/reports';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { CasesPage } from '../cases/cases';  
import { CallNumber } from '@ionic-native/call-number';   

import { MakereportPage } from '../makereport/makereport';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public goToReportsPage(){
    this.navCtrl.push(CasesPage); 
}
public logout(){
    this.navCtrl.push(ReportsPage); 
}

public goToContactPage(){
    this.navCtrl.push(ContactPage);
}
 public goToAboutPage(){
    this.navCtrl.push(AboutPage);
}

public goToHomePage(){
    this.navCtrl.push(CasesPage);
}
constructor(public navCtrl: NavController, private callNumber: CallNumber) {

  }
  login(){
      this.navCtrl.push(ReportsPage);
  }
  call(){
      this.callNumber.callNumber("0774231343", true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }

}
