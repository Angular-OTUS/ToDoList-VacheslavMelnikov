import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoElement} from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent {
  @Input() toDo: TodoElement | undefined;
  @Output() idSent:EventEmitter<number> = new EventEmitter<number>();

  public sendId(): void {
    this.idSent.emit(this.toDo?.id);
  }
}
