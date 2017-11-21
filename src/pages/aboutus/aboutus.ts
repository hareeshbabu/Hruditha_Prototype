import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'aboutus.html'
})
export class AboutusPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

}
