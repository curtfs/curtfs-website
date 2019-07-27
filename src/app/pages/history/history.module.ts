// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { HistoryComponent } from "./history.component";
import { CarComponent } from "../../components/car/car.component";
import { InViewportModule } from "ng-in-viewport";
import { MatGridListModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    InViewportModule,
    RouterModule.forChild([
      {
        path: "",
        component: HistoryComponent
      }
    ])
  ],
  providers: [],
  declarations: [HistoryComponent, CarComponent]
})
export class HistoryModule {}
