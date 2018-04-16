import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycasesPage } from './mycases';

@NgModule({
  declarations: [
    MycasesPage,
  ],
  imports: [
    IonicPageModule.forChild(MycasesPage),
  ],
})
export class MycasesPageModule {}
