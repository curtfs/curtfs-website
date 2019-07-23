// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module

import { TeamsComponent } from "./teams.component";
import { MatSnackBarModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
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
