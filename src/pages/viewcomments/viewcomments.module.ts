import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewcommentsPage } from './viewcomments';

@NgModule({
  declarations: [
    ViewcommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewcommentsPage),
  ],
})
export class ViewcommentsPageModule {}
