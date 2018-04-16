import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ReportsPage } from '../reports/reports';
import { CasesPage } from '../cases/cases';
import { MakereportPage } from '../makereport/makereport';
import { ComplaintsPage } from '../complaints/complaints';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = CasesPage;
  tab5Root = ComplaintsPage;

  constructor() {

  }
}
