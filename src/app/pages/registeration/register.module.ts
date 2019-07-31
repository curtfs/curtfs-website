// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
// Core Module
import { RegisterationComponent } from "./register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatStepperModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatSliderModule
} from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AngularFireFunctionsModule } from "@angular/fire/functions";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatSliderModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSelectModule,
    AngularFireFunctionsModule,
    RouterModule.forChild([
      /* {
        path: "mangarial",
        component: RegisterationComponent,
        data: {
          type: "mang"
        }
      }, */
      {
        path: "technical",
        component: RegisterationComponent,
        data: {
          type: "tech"
        }
      }
    ])
  ],
  providers: [],
  declarations: [RegisterationComponent]
})
export class RegisterationModule {}
