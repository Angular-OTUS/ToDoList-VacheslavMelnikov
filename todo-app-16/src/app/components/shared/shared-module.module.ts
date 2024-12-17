import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from './button-component/button-component.component';
import {MatIconModule} from '@angular/material/icon';
import { TooltipDirective } from './tooltip.directive';
import {ToDoListService} from './to-do-list.service';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
  declarations: [
    ButtonComponentComponent,
    TooltipDirective,
    ToastsComponent
  ],
  exports: [
    ButtonComponentComponent,
    TooltipDirective,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  providers: [ToDoListService]
})
export class SharedModuleModule { }
