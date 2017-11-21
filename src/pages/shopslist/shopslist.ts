import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShopinfoPage } from '../shopinfo/shopinfo';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-shopslist',
  templateUrl: 'shopslist.html'
})
export class ShopslistPage {
  Shops: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.Shops = this.navParams.get('Shops');
  }

  ionViewDidLoad() {

  }
  goToShopInfoPage(Currentshop: any) {
    this.navCtrl.push(ShopinfoPage, { shop: Currentshop });
  }
}
