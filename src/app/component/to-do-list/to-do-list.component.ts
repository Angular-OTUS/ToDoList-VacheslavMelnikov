import { Component, OnInit } from '@angular/core';

export enum State {
  PLANNED = 'planned',
  COMPLETED = 'completed',
  DEL = 'deleted'
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})

export class ToDoListComponent implements OnInit {

  stay = State;

  toDoList = [
    {
      id: 1,
      state: State.PLANNED,
      toDo: 'Задачи на понедельник, первый день недели. Реализация задач, поставленных в пятницу.'
    },
    {
      id: 2,
      state: State.PLANNED,
      toDo: 'Задачи на вторник. Проверить результат работы за понедельник'
    },
    {
      id: 3,
      state: State.PLANNED,
      toDo: 'Задачи на среду. Сверка, согласование.'
    },
    {
      id: 4,
      state: State.PLANNED,
      toDo: 'Задачи на четверг. Обсуждение с командой результатов работы начала недели. Корректировка задач разработчиков по результату работы тестировщиков'
    },
    {
      id: 5,
      state: State.PLANNED,
      toDo: 'Задачи на пятницу. Корректировки задач от руководства. Откат к коммитам прошлой недели. Подготовка к выходным и праздникам.'
    }
  ]



  constructor() { }

  ngOnInit(): void {
  }

}
