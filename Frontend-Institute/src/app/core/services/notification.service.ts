import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private notification: NzNotificationService,

  ) { }

  createNotification(type, title, message, position) {
    this.notification.create(
      type,
      title,
      message,
      { nzPlacement: 'topRight' }
    );
  }
}
