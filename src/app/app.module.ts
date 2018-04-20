import { AuthService } from '../providers/auth-service/auth-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactionsPage } from '../pages/reactions/reactions';
import { AboutPage } from '../pages/about/about';
import { ReviewPage } from '../pages/review/review';
import { DirectionsPage } from '../pages/directions/directions';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Tabs2Page } from '../pages/tabs2/tabs2';
import { MyreportedPage } from '../pages/myreported/myreported';
import { ReportsPage } from '../pages/reports/reports';
import { CasesPage } from '../pages/cases/cases';
import { SignupPage } from '../pages/signup/signup';
import { PolicePage } from '../pages/police/police';
import { MycasesPage } from '../pages/mycases/mycases';
import { ComplaintsPage } from '../pages/complaints/complaints';
import { AnalysisPage } from '../pages/analysis/analysis';
import { ViewcommentsPage } from '../pages/viewcomments/viewcomments';
import { CasedisplayPage } from '../pages/casedisplay/casedisplay';
import { Network } from '@ionic-native/network';
import { MakereportPage } from '../pages/makereport/makereport';
import { ProgressPage } from '../pages/progress/progress';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { StatusBar } from '@ionic-native/status-bar';
import * as $ from 'jquery';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsProvider } from '../providers/settings/settings';
import { CallNumber } from '@ionic-native/call-number';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    MyreportedPage,
    ViewcommentsPage,
    ReviewPage,
    ProgressPage,
    PolicePage,
    HomePage,
    ReportsPage,
    MakereportPage,
    MycasesPage,
    LoginPage,
    ReactionsPage,
    CasedisplayPage,
    DirectionsPage,
    SignupPage,
    AnalysisPage,
    ComplaintsPage,
    CasesPage,
    TabsPage,
    Tabs2Page
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, 
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ReviewPage,
    ProgressPage,
    MyreportedPage,
    MakereportPage,
    PolicePage,
    MycasesPage, 
    DirectionsPage,
    AnalysisPage,
    CasedisplayPage,
    SignupPage,
    ReactionsPage,
    ComplaintsPage,
    ViewcommentsPage,
    HomePage,
    ReportsPage,
    LoginPage,
  CasesPage,  
    Tabs2Page, 
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    Network,
    AuthService,
    Geolocation,
    CallNumber,
    LaunchNavigator,
	 
  
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
 
  ]
})
export class AppModule {}
