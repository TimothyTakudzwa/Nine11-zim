import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportsPage } from '../reports/reports';
import { CasesPage } from '../cases/cases';
import { MakereportPage } from '../makereport/makereport';
import { ComplaintsPage } from '../complaints/complaints';

@Component({
  templateUrl: 'tabs2.html'
})
export class Tabs2Page {

  tab1Root = CasesPage;
  tab2Root = ReportsPage;
  tab3Root = ContactPage;
  tab4Root = CasesPage;
  tab5Root = ComplaintsPage;

  constructor(public navCtrl: NavController,) {

  }

}
