import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { firebase, firebaseui } from "firebaseui-angular";

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      /* // Required to enable this provider in one-tap sign-up.
      authMethod: "https://accounts.google.com",
      // Required to enable ID token credentials for this provider.
      clientId:
        "696144332508-12ouumb8pop29qkm8sokctmcn0o2r03n.apps.googleusercontent.com", */
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: "select_account"
      }
    },
    {
      scopes: ["public_profile", "email"],
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
  ],
  tosUrl: "/tos.txt",
  privacyPolicyUrl: "/privacy.txt",
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  exports: [
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule
  ]
})
export class FirebaseModule {}
