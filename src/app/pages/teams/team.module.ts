// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module

import { TeamsComponent } from "./teams.component";
import { MatSnackBarModule, MatGridListModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatGridListModule,
    RouterModule.forChild([
      {
        path: "",
        component: TeamsComponent
      }
    ])
  ],
  providers: [],
  declarations: [TeamsComponent]
})
export class TeamsModule {}
