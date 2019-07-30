import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import "firebase/messaging";

import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  token: string;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snack: MatSnackBar
  ) {}

  updateToken(token) {
    this.afAuth.authState
      .pipe(
        map(user => {
          if (user) return user;
        })
      )
      .subscribe(async user => {
        const potUser = await this.db
          .collection("Users")
          .doc(user.uid)
          .get()
          .toPromise();

        console.log(potUser);
        potUser.ref.update({ fcmToken: token });
      });
  }

  monitorRefresh() {
    this.messaging.onTokenRefresh(() => {
      this.messaging
        .getToken()
        .then(refreshedToken => {
          console.log("Token refreshed.", refreshedToken);
          this.updateToken(refreshedToken);
        })
        .catch(err => console.log(err, "Unable to retrieve new token"));
    });
  }

  getPermission() {
    this.messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token, "granted fcm token");
        this.updateToken(token);
      })
      .catch(err => {
        console.log("Unable to get permission to notify.", err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      console.log("Message received. ", payload);
      this.makeSnack(payload.notification.body);
      this.currentMessage.next(payload);
    });
  }

  makeSnack(text: string) {
    this.snack.open(text, null, { duration: 5 * 1000 });
  }
}
