import {asNativeElements, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {ButtonType} from '../shared/button-component/button-component.component';

export interface TodoElement {
  id: number;
  title: string;
  toDoText: string;
  description?: string;
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  public toDoFromApi: TodoElement[] = [
    {
      id: 1,
      title: "Todo Number 1",
      toDoText: "Задача организации, в особенности же укрепление и развитие структуры влечет за собой процесс внедрения и модернизации форм развития. Задача организации, в особенности же реализация намеченных плановых заданий представляет собой интересный эксперимент проверки систем массового участия.",
      description: "Описание к Todo Number 1. В описании укрепление и развитие структуры и особенности реализации намеченных плановых заданий"
    },
    {
      id: 2,
      title: "Todo Number 2",
      toDoText: "Значимость этих проблем настолько очевидна, что рамки и место обучения кадров способствует подготовки и реализации соответствующий условий активизации. Задача организации, в особенности же дальнейшее развитие различных форм деятельности играет важную роль в формировании дальнейших направлений развития.",
      description: "Описание к Todo Number 2"
    },
    {
      id: 3,
      title: "Todo Number 3",
      toDoText: "Яавным образом постоянное информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также новая модель организационной деятельности требуют от нас анализа новых предложений.",
      description: "Описание к Todo Number 3"
    },
    {
      id: 4,
      title: "Todo Number 4",
      toDoText: "Идейные соображения высшего порядка, а также реализация намеченных плановых заданий позволяет оценить значение систем массового участия. Равным образом новая модель организационной деятельности позволяет выполнять важные задания по разработке систем массового участия."
    }
  ];

  @ViewChild('textAreaElement') textAreaElement?: ElementRef;
  @ViewChild('textAreaElementDescription') textAreaElementDescription?: ElementRef;

  isLoading = true;
  private loadingSubscription: Subscription = new Subscription();

  buttonSubmit = ButtonType.SUBMIT;

  public removeElementWithId(id: number): void {
    this.toDoFromApi = this.toDoFromApi.filter(todo => todo.id !== id);
  }

  public buttonDisable(): boolean {
    return this.textAreaElement?.nativeElement.value.length < 3;
  }

  public addNewElement(): void {
    const id = Math.max(...this.toDoFromApi.map(todo => todo.id)) + 1;
    const title = "Todo Number " + id;
    const toDoText = this.textAreaElement?.nativeElement.value;
    const description = this.textAreaElementDescription?.nativeElement.value;

    if (this.textAreaElement) {
      this.textAreaElement.nativeElement.value = '';
    }

    if (this.textAreaElementDescription) {
      this.textAreaElementDescription.nativeElement.value = '';
    }

    this.toDoFromApi.push({
      id,
      title,
      toDoText,
      description
    })
  }

  ngOnInit() {
    this.loadingSubscription = timer(500).subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
