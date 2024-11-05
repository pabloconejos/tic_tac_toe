import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('../../../features/home/home.module').then( m => m.HomeModule)},
      { path: 'room', loadChildren: () => import('../../../features/room/room.module').then( m => m.RoomModule)},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }