import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { WinnerModalComponent } from './winner-modal/winner-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    WaitingRoomComponent,
    WinnerModalComponent,
    LanguageSelectorComponent,
    DisclaimerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DragDropModule
  ],
  exports: [LanguageSelectorComponent, DisclaimerComponent]
})
export class SharedModule { }
