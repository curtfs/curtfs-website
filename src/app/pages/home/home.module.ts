// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent
      }
    ])
  ],
  providers: [],
  declarations: [HomeComponent]
})
export class HomeModule {}
