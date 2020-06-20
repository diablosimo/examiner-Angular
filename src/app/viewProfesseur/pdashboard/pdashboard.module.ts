import {NgModule} from "@angular/core";
import {PdashboardRoutingModule} from "./pdashboard-routing.module";
import {PdashboardComponent} from "./pdashboard.component";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ButtonsRoutingModule} from "../../views/buttons/buttons-routing.module";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {FormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {InterceptorService} from "../../service/interceptor-service.service";
import {TokenService} from "../../service/token/token.service";


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    PdashboardRoutingModule,
    ChartsModule,
  ],
declarations: [PdashboardComponent ],
})
export class PdashboardModule {
}
