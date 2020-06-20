import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {INavData} from "@coreui/angular";
import {interval, Subscription} from "rxjs";
import {DatePipe} from "@angular/common";
import { Notification } from './notifications'
import {NotificationService} from "../../service/notification.service";
import {TokenService} from '../../service/token/token.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  apiToken:String;
  public sidebarMinimized = false;
  public navItems:INavData[]=[] ;
  constructor(private notificationService: NotificationService,private route: ActivatedRoute,private tokenService:TokenService) {
  this.navItems=this.route.snapshot.data['navItem'];
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  notifications: Notification[] = [];
  notification: Notification;
  editNotification: Notification;

  subscription: Subscription;
  intervalId: number;

  count : number;
  shownotif: Boolean=false;

  ngOnInit() {
    this.apiToken=this.tokenService.GetTok();

    this.fetchNotificationbyUserid(this.apiToken);
    const source = interval(10000);
    this.subscription = source.subscribe(val => this.fetchNotificationbyUserid(this.apiToken))
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
  }

  fetchNotificationbyUserid(user_id: String): void {
    this.notificationService.fetchNotificationbyUserid(user_id).subscribe(notifications => {
      (this.notifications = notifications);
      this.count = 0;
      Array.prototype.forEach.call(this.notifications,item =>{
        (item.vu_a === null)? this.count ++ : null
      });
    });
  }

  fetchNotificationbyid(id: number): void {
    this.notificationService.fetchNotificationbyid(id).subscribe(notification => (this.notification = notification))
  }

  fetchNotifications(): void {
    this.notificationService.fetchNotifications().subscribe(notifications => (this.notifications = notifications))
  }

  updateNotification(notification) {
    notification.vu_a = new DatePipe('en-US').transform(Date.now(), 'yyyy-MM-dd hh:mm:ss');
    this.notificationService.updateNotification(notification.id, notification.vu_a).subscribe((response) => {
    })
  }

}
