import {Component, OnInit} from '@angular/core';
import {ToastServiceService} from '../toast-service.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {
  public listOfToasts = this.toastServiceService.toastList;

  constructor(private toastServiceService: ToastServiceService) {}
  ngOnInit() {

  }
}
