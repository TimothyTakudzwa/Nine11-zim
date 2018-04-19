import { ReportsPage } from '../reports/reports';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
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
    localStorage.removeItem("username");   
    this._app.getRootNav().setRoot(ReportsPage);
    
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

username : any;
calls:any;
lati: any = "";
long: any = "";
name: any;
message: any;
location : any;
userData = {
    "longitude": "", "latitude": ""
};
responseData: any;
results: any;
    constructor(public navCtrl: NavController, public _app: App, public navParams: NavParams, public authService: AuthService, public loadingController: LoadingController, public geolocation: Geolocation, public alertCtrl: AlertController, private callNumber: CallNumber) {

  }
loadMap() {

    let loader = this.loadingController.create({
        content: "Loading...."
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
            this.userData.latitude = this.lati;
            this.userData.longitude = this.long;
            this.authService.postData(this.userData, 'calls.php').then((result) => {

                this.responseData = result;
                console.log(this.responseData);
                let message = localStorage.setItem('message', this.responseData.status_message);
                let calls = localStorage.setItem('calls', this.responseData.phone);
                let location = localStorage.setItem('location', this.responseData.location);
                loader.dismiss();
                
            
            }, (err) => {
                // Error log
            });
        loader.dismiss();
        _.showConfirm();
    }, (err) => {
        console.log(err); 
    });
   
}
    showConfirm() {
        let _ = this;
        this.message = localStorage.getItem('message');
        this.location = localStorage.getItem('location');
        let confirm = this.alertCtrl.create({
            title: 'Place Call',
            message: this.message,
            buttons: [

                {
                    text:  'Call ' + this.location + ' Police',
                    handler: () => {
                        _.calling();;
                    }
                },
                {
                    text: 'Choose Police Station',
                    handler: () => {
                        console.log('Agree clicked');
                    }
                },
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    }


calling(){
    this.calls = localStorage.getItem('calls');
    console.log(this.calls);
this.callNumber.callNumber(this.calls, true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer')); 
          this.showConfirm(); 
}
  login(){
      this.navCtrl.push(ReportsPage);
  }
  call(){
      this.loadMap()
      
    }

}
