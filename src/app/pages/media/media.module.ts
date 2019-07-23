// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { MediaComponent } from "./media.component";
import {
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
  MatButtonModule
} from "@angular/material";

import { InViewportModule } from "ng-in-viewport";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatGridListModule,
    InViewportModule,
    RouterModule.forChild([
      {
        path: "",
        component: MediaComponent
      }
    ])
  ],
  providers: [],
  declarations: [MediaComponent]
})
export class MediaModule {}
