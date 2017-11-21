import { Component, ElementRef } from '@angular/core';
import { NavController, PopoverController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { AboutusPage } from '../aboutus/aboutus';
import { SearchfilterPage } from '../searchfilter/searchfilter';
import { NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { ShopslistPage } from '../shopslist/shopslist';
import { ShopinfoPage } from '../shopinfo/shopinfo';
import { CustomersProvider } from '../../providers/customers/customers';
import { Storage } from '@ionic/storage';
import { googlemaps } from 'googlemaps'

import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public _custCls: { CustName: string, Cust: any }[] = [];
  public Customers: any;
  public Repairfacility: any[] = [];
  public NumberOfShops: number = 0;
  public NearByShops: any[] = [];
  data: any;
  public searchRadius: number = 60;
  //Parameters
  public FacilityType: string;
  public Radius: string;
  public CarType: string;
  public Certificates: string;
  public Minlbr: string;
  public MaxLbr: string;
  //End of parameters
  lat: number = 32.889790;
  lng: number = -96.975872;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number = 16;
  centers = [{ 'lat': 32.889069, 'lng': -96.978511 }, { 'lat': 32.890087, 'lng': -96.973844 }];
  mystyles = [{ "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#747474" }, { "lightness": "23" }] }, { "featureType": "poi.attraction", "elementType": "geometry.fill", "stylers": [{ "color": "#f38eb0" }] }, { "featureType": "poi.government", "elementType": "geometry.fill", "stylers": [{ "color": "#ced7db" }] }, { "featureType": "poi.medical", "elementType": "geometry.fill", "stylers": [{ "color": "#ffa5a8" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#c7e5c8" }] }, { "featureType": "poi.place_of_worship", "elementType": "geometry.fill", "stylers": [{ "color": "#d6cbc7" }] }, { "featureType": "poi.school", "elementType": "geometry.fill", "stylers": [{ "color": "#c4c9e8" }] }, { "featureType": "poi.sports_complex", "elementType": "geometry.fill", "stylers": [{ "color": "#b1eaf1" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": "100" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }, { "lightness": "100" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffd4a5" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffe9d2" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "weight": "3.00" }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "weight": "0.30" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#747474" }, { "lightness": "36" }] }, { "featureType": "road.local", "elementType": "labels.text.stroke", "stylers": [{ "color": "#e9e5dc" }, { "lightness": "30" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": "100" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d2e7f7" }] }];

  markerIcon = {
    path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
    strokeOpacity: 0,
    strokeWeight: 1,
    fillColor: '#274abb',
    fillOpacity: 1,
    rotation: 0,
    scale: 1.2
  }
  markerIconLOC = {
    path: 'M19.9,0c-0.2,0-1.6,0-1.8,0C8.8,0.6,1.4,8.2,1.4,17.8c0,1.4,0.2,3.1,0.5,4.2c-0.1-0.1,0.5,1.9,0.8,2.6c0.4,1,0.7,2.1,1.2,3 c2,3.6,6.2,9.7,14.6,18.5c0.2,0.2,0.4,0.5,0.6,0.7c0,0,0,0,0,0c0,0,0,0,0,0c0.2-0.2,0.4-0.5,0.6-0.7c8.4-8.7,12.5-14.8,14.6-18.5 c0.5-0.9,0.9-2,1.3-3c0.3-0.7,0.9-2.6,0.8-2.5c0.3-1.1,0.5-2.7,0.5-4.1C36.7,8.4,29.3,0.6,19.9,0z M2.2,22.9 C2.2,22.9,2.2,22.9,2.2,22.9C2.2,22.9,2.2,22.9,2.2,22.9C2.2,22.9,3,25.2,2.2,22.9z M19.1,26.8c-5.2,0-9.4-4.2-9.4-9.4 s4.2-9.4,9.4-9.4c5.2,0,9.4,4.2,9.4,9.4S24.3,26.8,19.1,26.8z M36,22.9C35.2,25.2,36,22.9,36,22.9C36,22.9,36,22.9,36,22.9 C36,22.9,36,22.9,36,22.9z M13.8,17.3a5.3,5.3 0 1,0 10.6,0a5.3,5.3 0 1,0 -10.6,0',
    strokeOpacity: 0,
    strokeWeight: 1,
    fillColor: '#bc260f',
    fillOpacity: 1,
    rotation: 0,
    scale: 0.8,
  }

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController
  ) {

  }
  getAllCustomers() {
    this.NearByShops = [];
    this.NumberOfShops = 0;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var _hdrs = new Headers();
    _hdrs.set('Content-Type', 'application/x-www-form-urlencoded');
    // _hdrs.set('radius', '100');
    let params: URLSearchParams = new URLSearchParams();
    params.set('skip', '0');
    params.set('take', '1000');
    params.set('facilityType', this.FacilityType);
    params.set('coveredRadius', this.Radius);
    params.set('repairsCapacity', '');
    params.set('carType', '');
    params.set('certificate', this.Certificates);
    params.set('rangeMin', this.Minlbr);
    params.set('rangeMax', this.MaxLbr);
    params.set('filterShop', '');
    params.set('latitude', this.latitude.toString());
    params.set('longitude', this.longitude.toString());
    return new Promise(resolve => {
      //http://railcarrxpitstopapi20170516123440.azurewebsites.net/api/values
      this.http.get('http://railcarrxpitstopapi20170516123440.azurewebsites.net/api/values', { headers: _hdrs, search: params }).map((response: Response) => {
        this.Customers = response.json().location;
        //console.log(response.json());
        for (let data of this.Customers) {
          if (data.shops != null) {
            for (let shop of data.shops) {
              //this.Repairfacility.push(shop);
              let _shp = { CustName: data.name, Cust: shop };
              //this._custCls.push(_shp);
              this.NearByShops.push(_shp);
            }
          }
        }
        //console.log(this.NearByShops);
        this.NumberOfShops = this.NearByShops.length;
        loading.dismiss();
      }).subscribe();
    });
  }
  private setShopLocation(lat, lng) {
    if ("geolocation" in navigator) {
      //console.log('nav');
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = lat;
        this.longitude = lng;
        this.zoom = 12;
      });
    }
  }
  presentPopover() {
    let popover = this.modalCtrl.create(SearchfilterPage,
      {
        RF: this.FacilityType,
        RD: this.Radius,
        CT: this.CarType,
        Cer: this.Certificates,
        Lbr: this.MaxLbr
      });
    popover.onDidDismiss(data => {
      //console.log(data);
      if (data) {
        this.FacilityType = data.RF;
        this.Radius = data.RD;
        this.CarType = data.CT;
        this.Certificates = data.Cer;
        this.MaxLbr = data.MaxLbr;

        this.getAllCustomers();
      }
    });
    popover.present();
  }
  searchWindowOpen() {
    let profileModal = this.modalCtrl.create(SearchfilterPage, { userId: 8675309 });
    profileModal.present();
  }
  goToAboutUs() {
    this.navCtrl.push(AboutusPage);
  }
  refreshPage() {
    //create search FormControl
    this.searchControl = new FormControl();
    this.FacilityType = '';
    this.Radius = '';
    this.CarType = '';
    this.Certificates = '';
    this.Minlbr = '';
    this.MaxLbr = '';
    //set current position
    this.setCurrentPosition();

  }
  goToShopsListPage() {
    this.navCtrl.push(ShopslistPage, { Shops: this.NearByShops });
  }
  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {

      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //let usersLocation = {
          //  lat: place.geometry.location.lat(),
          //  lng: place.geometry.location.lng()
          //};
          //  this.NearByShops = [];
          //  this.NumberOfShops = 0;
          //  for (let data of this._custCls) {
          //   let distance = this.applyHaversine(data.Cust, usersLocation);
          //  if (parseFloat(distance) <= this.searchRadius) {
          //console.log('This location is far');
          //    this.NumberOfShops = this.NumberOfShops + 1;
          //    this.NearByShops.push(data);
          //  }
          //}
          //console.log(this.NearByShops);
          //console.log(this.NearByShops);
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.lat = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.lng = place.geometry.location.lng();
          this.zoom = 16;
          // call nearest shops function
          this.getAllCustomers()
        });
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;

        this.getAllCustomers();
        //this.NearByShops = [];
      });
    }
  }
  shopDetailsOpen(Currentshop: any) {
    this.navCtrl.push(ShopinfoPage, { shop: Currentshop });
  }
}

