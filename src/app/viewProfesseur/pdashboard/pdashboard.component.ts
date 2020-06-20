import { Component, OnInit } from '@angular/core';
import {Classe} from "../../model/classe";
import {ChartsService} from "../../service/charts.service";
import {TokenService} from "../../service/token/token.service";

@Component({
  templateUrl: './pdashboard.component.html',
  styleUrls: ['./pdashboard.component.css']
})
export class PdashboardComponent  implements OnInit{
  apiToken:any
  constructor(private tokenService:TokenService, private chartService: ChartsService) {
  }


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any = [{data: [], label: 'Note moyenne',backgroundColor:'rgba(58,126,255,0.92)'}];
  public barChartLabels: string[] = [];

  public barChartData1: any = [{data: [],backgroundColor:'rgba(25,255,26,0.92)', label: 'nombre des examens'}];
  public barChartLabels1: string[] = [];

  public barChartData2: any = [{data: [], label: 'nombre des etudiants',backgroundColor:'rgba(255,55,120,0.92)'}];
  public barChartLabels2: string[] = [];

  idClasse: number = 0;
  classes: Classe[] = [];





  setData(data:number[]){
    this.barChartData[0].data=data;
  }
  setData1(data:number[]){
    this.barChartData1[0].data=data;
  }
  setData2(data:number[]){
    this.barChartData2[0].data=data;
  }

  ngOnInit(): void {
    this.apiToken=this.tokenService.GetTok();
    this.loadMyClasses();
    this.loadNumberOfExamsByClass();
    this.loadNumberOfStudentsByClass();

  }


  public loadMyClasses() {
    this.chartService.getClasses(this.apiToken).subscribe((response) => {
      if (response[0] == 1) {
        this.classes = response[1];
      }
    });
  }

  changeClassHandler(e){
    this.idClasse=e.target.value;
    this.loadMeanMarkOfClassByExam( this.idClasse);
  }

  loadMeanMarkOfClassByExam(idClass:number){
    this.chartService.loadMeanMarkOfClassByExam(idClass,this.apiToken).subscribe((response) => {
      if (response[0]==1){
        this.barChartLabels=response[1];
        this.setData(response[2]);
      }

    });
  }

  loadNumberOfExamsByClass(){
    this.chartService.loadNumberOfExamsByClass(this.apiToken).subscribe((response) => {
      if (response[0]==1){
        this.barChartLabels1=response[1];
        this.setData1(response[2]);
      }

    });
  }

  loadNumberOfStudentsByClass(){
    this.chartService.loadNumberOfStudentsByClass(this.apiToken).subscribe((response) => {
      if (response[0]==1){
        this.barChartLabels2=response[1];
        this.setData2(response[2]);
      }
    });
  }


}
