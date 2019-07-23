import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs/operators";

export interface Person {
  name: string;
  position: string;
  image: string;
}

@Component({
  selector: "curt-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"]
})
export class PersonComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  persons: Person[];

  @Input() name: string;
  @Input() position: string;
  @Input() image: string;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {}
}
