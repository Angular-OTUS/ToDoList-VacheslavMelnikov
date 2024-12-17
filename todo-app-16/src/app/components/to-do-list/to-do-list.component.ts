import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ButtonType} from '../shared/button-component/button-component.component';
import {TodoElement, ToDoListService} from '../shared/to-do-list.service';
import {LoadingIndicator} from '../shared/loading-indicator';
import {NotificationService} from '../shared/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit, OnDestroy {

  @ViewChild('textAreaElement') textAreaElement?: ElementRef;
  @ViewChild('textAreaElementDescription') textAreaElementDescription?: ElementRef;

  private subscription: Subscription = new Subscription();
  public toDoList: TodoElement[] = [];
  readonly loadingIndicatorList = new LoadingIndicator;
  buttonSubmit = ButtonType;

  constructor(
    private toDoListService: ToDoListService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService) {
    this.loadingIndicatorList.isLoading = true;
  }

  public buttonDisable(): boolean {
    return this.textAreaElement?.nativeElement.value.length < 3;
  }

  public addNewElement(): void {
    const title = "Todo Number ";
    const toDoText = this.textAreaElement?.nativeElement.value;
    const description = this.textAreaElementDescription?.nativeElement.value;

    if (this.textAreaElement) {
      this.textAreaElement.nativeElement.value = '';
    }

    if (this.textAreaElementDescription) {
      this.textAreaElementDescription.nativeElement.value = '';
    }
    const addNewElementSubscription = this.toDoListService.addNewElement({title, toDoText, description}).subscribe(() => {
      this.notificationService.showMessage('Задача добавлена');
    });
    this.subscription.add(addNewElementSubscription);
  }

  ngOnInit() {
    const toDoListSubscription = this.toDoListService.toDoList$.subscribe(value => {
      this.toDoList = value;
      this.changeDetectorRef.detectChanges();
      });
    this.subscription.add(toDoListSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
