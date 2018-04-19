import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnalysisPage } from '../analysis/analysis';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import * as $ from 'jquery';
declare var google;

@Component({
  selector: 'contact-page',
  templateUrl: 'contact.html'
})
export class ContactPage {

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
    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingController: LoadingController, public geolocation: Geolocation, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.loadMap();
    
  }
  signup()
       {
          let loader = this.loadingController.create({
            content: "Loading..."
          });

          loader.present();
          console.log(this.lati);
          
          this.userData.latitude = this.lati;
          this.userData.longitude = this.long;
          this.authService.postData(this.userData, 'repo2.php').then((result) => {

            this.responseData = result;
          if (this.responseData.case_id == null)
              {
            let name = localStorage.setItem('name', this.responseData.name);
                this.navCtrl.push(AnalysisPage);
                loader.dismiss();  
              }

            else {
              this.results = this.responseData;
              this.name = this.results.name;
            
              console.log(this.name);
              loader.dismiss();
                  }
            // else { console.log("User already exists"); }
          }, (err) => {
            // Error log
          });

      }

  addMarker() 
  {
    
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: true,
          position: this.map.getCenter()
        });
        marker.addListener('drag', function (event) {
          $('#lat').val(event.latLng.lat());
          $('#lng').val(event.latLng.lng());

        });
        let _ = this;
        marker.addListener('dragend', function (event) {
          $('#lat').val(event.latLng.lat());
          $('#lng').val(event.latLng.lng());

          _.lati = event.latLng.lat();
          _.long = event.latLng.lng();
          console.log(_.lati);
        });
        

  }
  loadMap() 
  {

    let loader = this.loadingController.create({
      content: "Please wait while map is loading....."
    });
    loader.present();

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
        
      console.log(this.lati);
      loader.dismiss();
    }, (err) => {
      console.log(err);
    });

  }
  
}