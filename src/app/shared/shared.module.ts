import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { WinnerModalComponent } from './winner-modal/winner-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';



@NgModule({
  declarations: [
    WaitingRoomComponent,
    WinnerModalComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [LanguageSelectorComponent]
})
export class SharedModule { }
