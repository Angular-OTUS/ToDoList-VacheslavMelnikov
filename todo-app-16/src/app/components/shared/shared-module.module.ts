import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from './button-component/button-component.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ButtonComponentComponent
  ],
  exports: [
    ButtonComponentComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModuleModule { }
