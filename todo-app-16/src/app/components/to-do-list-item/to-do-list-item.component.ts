import {Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ButtonType} from '../shared/button-component/button-component.component';
import {TodoElement, ToDoListService} from '../shared/to-do-list.service';
import {LoadingIndicator} from '../shared/loading-indicator';
import {Subscription} from 'rxjs';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent implements OnDestroy {
  protected readonly buttonSubmit = ButtonType;
  readonly loadingIndicatorItem = new LoadingIndicator;
  readonly loadingIndicatorTitle = new LoadingIndicator;
  private subscription: Subscription = new Subscription();
  public displayDescription = false;
  public titleEdit = false;
  inputText: string = '';


  @ViewChild('titleBlock') textBlockElement!: ElementRef;
  @Input() toDo!: TodoElement;

  constructor(
    private toDoListService: ToDoListService,
    private notificationService: NotificationService) {
    this.loadingIndicatorItem.isLoading = false;
    this.loadingIndicatorTitle.isLoading = false;
  }

  public toggleDescription() {
    this.displayDescription = !this.displayDescription;
  }

  public titleReset(event: Event) {
    event.stopPropagation();
    this.titleEdit = false;
    this.inputText = this.toDo.title;
    this.textBlockElement.nativeElement.innerText = this.toDo.title;
  }

  public removeElement(event: Event): void {
    event.stopPropagation();
    this.toDoListService.removeElementWithId(this.toDo.id, this.loadingIndicatorItem);
  }

  updateText() {
    this.inputText = this.textBlockElement.nativeElement.innerText;
  }

  public titlePush(event: Event): void {
    event.stopPropagation();
    this.loadingIndicatorTitle.isLoading = true;
    const editTitleSubscription = this.toDoListService.editTitle(this.toDo.id,  this.inputText).subscribe(() => {
      this.inputText = '';
      this.titleEdit = false;
      this.loadingIndicatorTitle.isLoading = false;
      this.notificationService.showMessage('Внесены изменения');
    });
    this.subscription.add(editTitleSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
