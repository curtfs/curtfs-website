// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import {
  MatGridListModule,
  MatSnackBarModule,
  MatButtonModule,
  MatDialogModule
} from "@angular/material";
import { MazeComponent } from "./maze.component";
import { MazeCanvasComponent } from "../../components/maze-canvas/maze-canvas.component";
import { FirebaseUIModule } from "firebaseui-angular";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { DialogComponent } from "../../components/dialog-component/dialog.component";
import { firebaseUiAuthConfig } from "../../firebase.module";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    RouterModule.forChild([
      {
        path: "",
        component: MazeComponent
      }
    ])
  ],
  providers: [],
  declarations: [MazeComponent, MazeCanvasComponent, DialogComponent],
  entryComponents: [DialogComponent]
})
export class MazeModule {}
