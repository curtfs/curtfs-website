// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { HistoryComponent } from "./history.component";
import { CarComponent } from "../../components/car/car.component";

@NgModule({
  imports: [
    CommonModule,
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
