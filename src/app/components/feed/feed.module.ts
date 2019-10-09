import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import { SharedModule } from '../../shared/shared.module';



const routes: Routes = [
  {path: '', component: FeedComponent}
];

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedModule { }
