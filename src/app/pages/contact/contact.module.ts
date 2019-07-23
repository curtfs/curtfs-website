// Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Core Module
import {
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatInputModule,
  MatSnackBarModule
} from "@angular/material";
import { ContactComponent } from "./contact.component";
import { AngularFireFunctionsModule } from "@angular/fire/functions";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    AngularFireFunctionsModule,
    RouterModule.forChild([
      {
        path: "",
        component: ContactComponent
      }
    ])
  ],
  providers: [],
  declarations: [ContactComponent]
})
export class ContactModule {}
