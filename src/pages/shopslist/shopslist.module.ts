import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopslistPage } from './shopslist';

@NgModule({
  declarations: [
    ShopslistPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopslistPage),
  ],
  exports: [
    ShopslistPage
  ]
})
export class ShopslistPageModule {}
