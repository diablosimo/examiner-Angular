import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IHttpState} from "../view/http-spinner/http-spinner.component";

@Injectable({
  providedIn: 'root'
})
export class HttpStateService {
  public state = new BehaviorSubject<IHttpState>({} as IHttpState);

  constructor() { }
}
