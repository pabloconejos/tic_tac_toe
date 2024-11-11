import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './pages/room/room.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: ':id',
    component: RoomComponent
  }
]


@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class RoomModule { }
