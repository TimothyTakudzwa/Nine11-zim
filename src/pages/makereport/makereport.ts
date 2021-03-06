import { ReportsResponse } from '../../providers/request/ReportsResponse';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import * as $ from 'jquery';

declare var google;
/**
 * Generated class for the MakereportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-makereport',
  templateUrl: 'makereport.html',
})
export class MakereportPage {
 @ViewChild('map') mapElement: ElementRef;
  map: any;
  todo : FormGroup;
  lati: any = "";
  long: any = "";
  responseData: any;
  userData = {"user": "","name": "", "phone": "", "age": "", "address": "", "latitude": "", "longitude": "", "sex": "", "crimetype": "", "details": "", "description": "" };

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public geolocation: Geolocation, public navParams: NavParams, public authService: AuthService, public loadingController: LoadingController, public alertCtrl: AlertController) {
    this.todo = new FormGroup({
      fullname: new FormControl("",[Validators.required]),
     
      phone: new FormControl("", [Validators.required]),
      address: new FormControl(""),
      age: new FormControl(""),
      sex: new FormControl([]),
      latit: new FormControl(""),
      longt: new FormControl(""),
      crimetype: new FormControl([]),
      details: new FormControl("",[Validators.required]),
      description: new FormControl(""),
    });
  }

  ionViewDidLoad() {
   this.loadMap();
   this.addMarker();
   console.log(this.userData.latitude);
  }

  showConfirm(res:ReportsResponse) {
    let confirm = this.alertCtrl.create({
      title: 'Success',
      message:res.status_message + ' and your case refence number is: ' + res.Case_ID,
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
  signup() {
    let loader = this.loadingController.create({
      content: "Loading..."
    });
    this.userData.user = localStorage.getItem('userName');
    this.userData.latitude =this.lati;
    this.userData.longitude = this.long;
    console.log(this.userData.latitude);
    loader.present();
    this.authService.postItem(this.userData,'reports.php').subscribe(
      res => { 
        loader.dismiss();
        this.parseResponse(res);
      },
      error=> this.onError(error)
    );
  }

  private parseResponse(res:ReportsResponse){
    console.log(res);
    this.showConfirm(res);
    this.navCtrl.push(TabsPage);
    
  }

  private onError(error:any) {
    console.log(error);
    
  }

  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    draggable : true,
    position: this.map.getCenter()
  });
   marker.addListener('drag',function(event) {
         $('#lat').val(event.latLng.lat())  ;
        $('#lng').val(event.latLng.lng())  ;
       
    });
    let _=this;
    marker.addListener('dragend',function(event) {
        $('#lat').val(event.latLng.lat())  ;
        $('#lng').val(event.latLng.lng())  ;

        _.lati = event.latLng.lat();
        _.long = event.latLng.lng();
    });
  
}
loadMap(){
  let loader = this.loadingController.create({
    content: "Please Wait while map is loading...."
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
      loader.dismiss();
     
 
    }, (err) => {
      console.log(err);
    });
 
  }
}
