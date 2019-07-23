// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { MatGridListModule, MatSnackBarModule } from "@angular/material";
import { MazeComponent } from "./maze.component";
import { MazeCanvasComponent } from "../../components/maze-canvas/maze-canvas.component";
import { FirebaseUIModule } from "firebaseui-angular";
import { firebaseUiAuthConfig } from "../../firebase.module";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatSnackBarModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirebaseUIModule.forFeature(firebaseUiAuthConfig),
    RouterModule.forChild([
      {
        path: "",
        component: MazeComponent
      }
    ])
  ],
  providers: [],
  declarations: [MazeComponent, MazeCanvasComponent]
})
export class MazeModule {}
