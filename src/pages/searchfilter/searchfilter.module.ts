import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchfilterPage } from './searchfilter';

@NgModule({
  declarations: [
    SearchfilterPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchfilterPage),
  ],
  exports: [
    SearchfilterPage
  ]
})
export class SearchfilterPageModule {}
