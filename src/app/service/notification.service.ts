import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from "./HttpErrorHandler";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../containers/default-layout/notifications";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private handleError: HandleError;
  private url="http://127.0.0.1:8000/"

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("NotificationService");
  }


  fetchNotifications(): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(this.url+"api/notification/liste")
      .pipe(catchError(this.handleError("fetchNotifications", [])));
  }

  fetchNotificationbyid(id: number): Observable<Notification> {
    const notification = {} as  Notification;
    return this.http
      .get<Notification>(this.url+`api/notification/${id}`)
      .pipe(catchError(this.handleError("fetchNotificationbyid", notification)));
  }

  fetchNotificationbyUserid(user_id: String): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(this.url+`api/notification/listebyuserid/${user_id}`)
      .pipe(catchError(this.handleError("fetchNotificationbyUserid",[])));
  }

  createNotification(user_id : number, type_notification : string, createur : string, nom : string, date : Date = null): Observable<void> {
    return this.http
      .post<void>(this.url+"api/notification/create", {user_id, type_notification, createur, nom, date});
  }

  deleteNotification(id: number): Observable<{}> {
    const url = this.url+`api/notification/delete/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError("deleteNotification")));
  }

  updateNotification(id : number, vu_a: Date): Observable<void> {
    return this.http
      .put<void>(this.url+`api/notification/update`, {id, vu_a});
  }
}
