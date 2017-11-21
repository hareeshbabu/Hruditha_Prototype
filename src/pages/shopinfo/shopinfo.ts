import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-shopinfo',
  templateUrl: 'shopinfo.html'
})
export class ShopinfoPage {
  public Customers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController) {
    this.Customers = this.navParams.get('shop');
  }
  ionViewDidLoad() {
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
