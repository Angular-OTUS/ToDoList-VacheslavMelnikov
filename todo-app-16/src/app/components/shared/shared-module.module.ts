import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from './button-component/button-component.component';
import {MatIconModule} from '@angular/material/icon';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    ButtonComponentComponent,
    TooltipDirective
  ],
  exports: [
    ButtonComponentComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModuleModule { }
