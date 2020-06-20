import { Component, OnInit } from '@angular/core';
import {CarouselConfig} from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-first-visit',
  templateUrl: './first-visit.component.html',
  styleUrls: ['./first-visit.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
  ]
})
export class FirstVisitComponent implements OnInit {

  myInterval: number =1800;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;

  constructor() {
    this.slides.push({
      image: `assets/img/principal.png`
    });
    this.slides.push({
      image: `assets/img/module.png`
    });
    this.slides.push({
      image: `assets/img/names.png`
    });
  }


  ngOnInit(): void {
  }

}
