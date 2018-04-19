import { ReportsPage } from '../reports/reports';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { CasesPage } from '../cases/cases';  
import { CallNumber } from '@ionic-native/call-number';   

declare var google;
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

@ViewChild('map') mapElement: ElementRef;
map: any;
lati: any = "";
long: any = "";
name: any;
userData = {
    "longitude": "", "latitude": ""
};
responseData: any;
results: any;
constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingController: LoadingController, public geolocation: Geolocation, public alertCtrl: AlertController, private callNumber: CallNumber) {

  }
loadMap() {

    let loader = this.loadingController.create({
        content: "Please wait while map is loading....."
    });
    loader.present();
    let _=this;
    this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
            this.lati = position.coords.latitude,
            this.long = position.coords.longitude,

           

        console.log(this.lati);
        loader.dismiss();
        _.calling();
    }, (err) => {
        console.log(err); 
    });
   
}
calling(){
this.callNumber.callNumber("0774231343", true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));  
}
  login(){
      this.navCtrl.push(ReportsPage);
  }
  call(){
      this.loadMap()
      
    }

}
