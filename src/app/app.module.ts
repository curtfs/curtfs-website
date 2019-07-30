import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatMenuModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSnackBarModule,
  GestureConfig
} from "@angular/material";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AuthService } from "./services/auth.service";
import { FooterComponent } from "./components/footer/footer.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { Angulartics2Module } from "angulartics2";
import { IDBService } from "./services/idb.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    Angulartics2Module.forRoot({
      developerMode: !environment.production,
      pageTracking: {
        clearHash: true,
        clearIds: true
      }
    }),
    // Material Modules for app.component ONLY
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    // Modal Dialog
    ServiceWorkerModule.register("combined-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    AuthService,
    IDBService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
