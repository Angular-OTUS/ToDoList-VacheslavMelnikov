import {Component, Input} from '@angular/core';

export enum ButtonType
{
  DELETE = 'btn-delete',
  SUBMIT = 'btn-submit',
  DISABLE = 'btn-disable',
}

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.scss']
})
export class ButtonComponentComponent {
  @Input() title = 'Delete';
  @Input() type: ButtonType = ButtonType.DELETE;
  @Input() disabled = false;
  @Input() image = '';
}
