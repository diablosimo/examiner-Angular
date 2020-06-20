import {Component, OnInit} from '@angular/core';
import {ChartsService} from '../../service/charts.service';
import {Classe} from '../../model/classe';
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-edashboard',
  templateUrl: './edashboard.component.html',
  styleUrls: ['./edashboard.component.css']
})
export class EdashboardComponent implements OnInit {

  public barChartData: any = [{data: [], label: 'Note moyenne',backgroundColor:'rgba(58,126,255,0.92)'}];

  stdApiToken;


  classes: Classe[] = [];



  constructor(private tokenService:TokenService,private chartService: ChartsService) {
  }

  setData(data:number[]){
    this.barChartData[0].data=data;
  }


  ngOnInit(): void {
this.stdApiToken=this.tokenService.GetTok();
    this.loadNotesByExam();
  }

  public lineChartData: any = [{data: [], label: 'notes',backgroundColor:'rgba(140,141,250,0.25)'}];
  public lineChartLabels: string[] = [];
  public lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public lineChartLegend = true;
  public lineChartType = 'line';


  loadNotesByExam(){
    this.chartService.loadNotesByExam(this.stdApiToken).subscribe((response) => {
      if (response[0]==1){
        this.lineChartLabels=response[1];
        this.lineChartData[0].data=response[2];
      }

    });
  }


}
