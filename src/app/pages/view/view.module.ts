// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module

import { ViewComponent } from "./view.component";
import {
  MatSnackBarModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FirebaseUIModule } from "firebaseui-angular";
import { firebaseUiAuthConfig } from "../../firebase.module";
import { CoolpipePipe } from "src/app/pipes/coolpipe.pipe";

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    RouterModule.forChild([
      {
        path: "",
        component: ViewComponent
      }
    ])
  ],
  providers: [],
  declarations: [ViewComponent, CoolpipePipe]
})
export class ViewModule {}
