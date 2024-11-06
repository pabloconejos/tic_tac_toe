import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { WaitingRoomComponent } from './shared/waiting-room/waiting-room.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    WaitingRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [CookieService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
