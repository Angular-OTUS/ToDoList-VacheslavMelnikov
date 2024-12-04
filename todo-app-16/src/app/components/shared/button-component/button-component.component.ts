import {Component, Input} from '@angular/core';
import {TodoElement} from '../../to-do-list/to-do-list.component';

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.scss']
})
export class ButtonComponentComponent {
  @Input() title = 'Delete';
}
