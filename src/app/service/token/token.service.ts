import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class TokenService {
constructor( private router: Router
) {
}
  private api_token: string;
  GetTok() {
    if(this.api_token)
    return this.api_token;
    else
      this.router.navigateByUrl('/login');
  }
  SetTok(item) {
    this.api_token=item;
  }
}
