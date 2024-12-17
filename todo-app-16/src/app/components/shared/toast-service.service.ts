import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  public toastList: string[] = ["Toast 1", "Toast 2", "Toast 3", "Toast 4", "Toast 5",];

  constructor() { }
}
