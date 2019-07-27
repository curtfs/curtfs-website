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
  MatRadioModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule
} from "@angular/material";
import { AngularFireFunctionsModule } from "@angular/fire/functions";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule,
    AngularFireFunctionsModule,
    RouterModule.forChild([
      {
        path: "",
        component: RegisterationComponent
      }
    ])
  ],
  providers: [],
  declarations: [RegisterationComponent]
})
export class RegisterationModule {}
