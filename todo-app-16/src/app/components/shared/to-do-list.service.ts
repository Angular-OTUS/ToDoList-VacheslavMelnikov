import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, timer} from 'rxjs';
import {NotificationService} from './notification.service';

export interface TodoElement {
  id: number;
  title: string;
  toDoText: string;
  description: string;
}

export type TodoContent = Omit<TodoElement, 'id'>

export interface LoaderObj {isLoading: boolean;}

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
private toDoInService = new BehaviorSubject<TodoElement[]>([]);
public toDoList$!: Observable<TodoElement[]>
private toDoFromApi: TodoElement[] = [
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
      toDoText: "Идейные соображения высшего порядка, а также реализация намеченных плановых заданий позволяет оценить значение систем массового участия. Равным образом новая модель организационной деятельности позволяет выполнять важные задания по разработке систем массового участия.",
      description: ""
    }
  ];

  constructor(private notificationService: NotificationService) {
    this.toDoList$ = this.toDoInService.asObservable().pipe(delay(500));
    this.toDoInService.next(this.toDoFromApi);
  }

  public removeElementWithId(id: number, loader: LoaderObj): void {
      loader.isLoading = true;
      const currentTodos = this.toDoInService.getValue();
      this.toDoInService.next(currentTodos.filter(todo => todo.id !== id));
      this.notificationService.showMessage('Задача удалена');
    };

  public addNewElement(elementContent: TodoContent): Observable<void> {
    return new Observable((observer) => {
      const currentTodos = this.toDoInService.getValue();
      const id = currentTodos.length > 0 ? Math.max(...currentTodos.map(todo => todo.id)) + 1 : 1;
      elementContent.title = elementContent.title + id;
      const newTodo = { id, ...elementContent};
      this.toDoInService.next([...currentTodos, newTodo]);

      const delayTimer = timer(1000).subscribe(() => {
        observer.next();
        observer.complete();
      });
      return () => {
        delayTimer.unsubscribe();
      };
    });
  }

  public editTitle(id: number, title: string): Observable<void> {
    return new Observable((observer) => {
      const currentTodos = this.toDoInService.getValue();
      currentTodos.map(todo => {if(todo.id === id) { todo.title = title;}});

      const delayTimer = timer(500).subscribe(() => {
        observer.next();
        observer.complete();
      });
      return () => {
        delayTimer.unsubscribe();
      };
    });
  }
}
