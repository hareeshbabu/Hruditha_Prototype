import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from "../home/home";

@Component({
  templateUrl: 'searchfilter.html'
})
export class SearchfilterPage {
  public FaclType: string;
  public Radius: string;
  public Cert: string;
  public CarType: string;
  public MaxLbr: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.FaclType = this.navParams.get('RF');
    this.Radius = this.navParams.get('RD');
    this.Cert = this.navParams.get('Cer');
    this.CarType = this.navParams.get('CT');
    this.MaxLbr = this.navParams.get('Lbr');
  }

  ionViewDidLoad() {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ApplyFliters() {
    this.viewCtrl.dismiss({ RF: this.FaclType, RD: this.Radius, Cer: this.Cert, CT: this.CarType, MaxLbr: this.MaxLbr });
  }
}
