// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { SponsorsComponent } from "./sponsors.component";
import { MatGridListModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule.forChild([
      {
        path: "",
        component: SponsorsComponent
      }
    ])
  ],
  providers: [],
  declarations: [SponsorsComponent]
})
export class SponsorsModule {}
