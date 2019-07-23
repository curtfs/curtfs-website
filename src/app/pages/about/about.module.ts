// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { MatGridListModule } from "@angular/material";
import { AboutComponent } from "./about.component";
import { PersonComponent } from "../../components/person/person.component";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule.forChild([
      {
        path: "",
        component: AboutComponent
      }
    ])
  ],
  providers: [],
  declarations: [AboutComponent, PersonComponent]
})
export class AboutModule {}
