import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from "firebaseui-angular";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { MessagingService } from "../../services/messaging.service";
import { IDBService } from "../../services/idb.service";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "../../components/dialog-component/dialog.component";
import { take } from "rxjs/operators";

@Component({
  selector: "curt-maze",
  templateUrl: "./maze.component.html",
  styleUrls: ["./maze.component.css"],
  entryComponents: [DialogComponent]
})
export class MazeComponent implements OnInit, OnDestroy {
  loggedIn = false;
  logObs: Subscription;

  constructor(
    private snack: MatSnackBar,
    private auth: AuthService,
    private msg: MessagingService,
    private idb: IDBService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.logObs = this.auth.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
  }

  async successCallback(ev: FirebaseUISignInSuccessWithAuthResult) {
    this.loggedIn = true;
    this.snack.open(
      `🎉🎉🎉 Welcome ${ev.authResult.user.displayName} 🎉🎉🎉`,
      null,
      {
        duration: 3 * 1000,
        horizontalPosition: "center"
      }
    );

    const isMessagingEnabled = await this.idb.hasKey("m");
    if (!isMessagingEnabled) {
      const visits = await this.idb.getDataByKey<number>("v");
      if (visits > 3) {
        const ref = this.dialog.open(DialogComponent, {
          hasBackdrop: true,
          disableClose: true,
          data: {
            title: "Can we send you notifications?",
            content: `We can see that you are a fan of ours, then don't miss out on our latest updates.\n
            Delivered directly from us, yours dearly Cairo University Racing Team.`
          }
        });

        ref.afterClosed().subscribe(result => {
          console.log({ result });
          if (result === "yes") {
            this.registerFCM();
          } else {
            const snackRef = this.snack.open(
              "Okay, you are refusing us, we will try to do our best next time. ",
              "RETRY",
              {
                duration: 7 * 1000
              }
            );

            snackRef
              .onAction()
              .pipe(take(1))
              .subscribe(() => {
                this.registerFCM();
              });
          }
        });
      }
    }
  }

  registerFCM() {
    this.msg.getPermission();
    this.msg.monitorRefresh();
    this.msg.receiveMessage();
    this.idb.setKey("m", true);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    this.loggedIn = false;
    console.error(errorData);
  }

  ngOnDestroy() {
    // clean up all observable subscription
    this.logObs.unsubscribe();
  }
}
