import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AmmoComponent } from './ammo.component';

const routes: Routes = [
  {path: '', component: AmmoComponent}
];


@NgModule({
  declarations: [AmmoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AmmoModule { }
