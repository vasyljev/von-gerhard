import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { MedsComponent } from './meds.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: MedsComponent}
]

@NgModule({
  declarations: [
    MedsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class MedsModule { }
