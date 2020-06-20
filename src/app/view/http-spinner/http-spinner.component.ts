import {Component, Input, OnInit} from '@angular/core';
import {HttpStateService} from "../../service/http-state-service.service";

@Component({
  selector: 'app-http-spinner',
  templateUrl: './http-spinner.component.html',
  styleUrls: ['./http-spinner.component.css']
})
export class HttpSpinnerComponent implements OnInit {

  public loading = false;
  @Input() public filterBy: string | null = null;
  constructor(private httpStateService: HttpStateService) { }

  /**
   * receives all HTTP requests and filters them by the filterBy
   * values provided
   */
  ngOnInit() {
    this.httpStateService.state.subscribe((progress: IHttpState) => {
      if (progress && progress.url) {
        if (!this.filterBy) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        } else if (progress.url.indexOf(this.filterBy) !== -1) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        }
      }
    });
  }
}
export interface IHttpState {
  url: string;
  state: HttpProgressState;
}
export enum HttpProgressState {
  start,
  end
}
