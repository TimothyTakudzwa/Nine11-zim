
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the DirectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class DirectionsPage {
  @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;
    lati: any;
    long:any;
    latitude : any;
    longitude : any;
    destination: string;
    start: string;
    constructor(public navCtrl: NavController, public geolocation: Geolocation, public loadingController: LoadingController, public navParams: NavParams, private launchNavigator: LaunchNavigator) {
        this.start = "";
        
        this.latitude = localStorage.getItem('latitude');
        this.longitude = localStorage.getItem('longitude');
        this.destination = this.latitude +  ',' + this.longitude;
    } 

  ionViewDidLoad() {
      let loader = this.loadingController.create({
          content: "Getting Route"
      });

      loader.present();
    this.loadMap();
   
    loader.dismiss();
  }
 doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

navigate(){
    let options: LaunchNavigatorOptions = {
        start: this.start,
       
    };
        console.log(this.destination);
    this.launchNavigator.navigate(this.destination, options)
        .then(
        success => alert('Launched navigator'),
        error => alert('Error launching navigator: ' + error)
        );
   
}

  loadMap(){
 
      this.geolocation.getCurrentPosition().then((position) => {

          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.lati = position.coords.latitude,
              this.long = position.coords.longitude,

              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
         
          let directionsService = new google.maps.DirectionsService;
          let directionsDisplay = new google.maps.DirectionsRenderer;

          directionsDisplay.setMap(this.map);
          directionsDisplay.setPanel(this.directionsPanel.nativeElement);

          directionsService.route({
              origin: new google.maps.LatLng(this.lati, this.long),
              destination: new google.maps.LatLng(this.latitude, this.longitude),
              travelMode: google.maps.TravelMode['DRIVING']
          }, (res, status) => {

              if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(res);
              } else {
                  console.warn(status);
              }

          });

      }, (err) => {
          console.log(err);
      });
        
    }
 
  

}
