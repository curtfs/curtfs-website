import { Component, OnInit, Input, Renderer2 } from "@angular/core";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs/operators";

@Component({
  selector: "curt-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"]
})
export class CarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  @Input() mode: "right" | "left";
  @Input() carImg: string;
  @Input() carName: string;
  @Input() engine: string;
  @Input() weight: string;
  @Input() power: string;
  @Input() maxSpeed: string;
  @Input() far: string;

  isLeft: boolean;
  isFar: boolean;

  constructor(
    private render: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.isLeft = this.mode === "left";
    this.isFar = this.far === "far";
  }

  animateRight(ev) {
    if (ev.visible) {
      this.render.addClass(ev.target, "slideInRight");
    }
  }

  animateLeft(ev) {
    if (ev.visible) {
      this.render.addClass(ev.target, "slideInLeft");
    }
  }
}
