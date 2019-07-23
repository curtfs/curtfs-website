import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from "firebaseui-angular";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "curt-maze",
  templateUrl: "./maze.component.html",
  styleUrls: ["./maze.component.css"]
})
export class MazeComponent implements OnInit, OnDestroy {
  loggedIn = false;
  logObs: Subscription;

  constructor(private snack: MatSnackBar, private auth: AuthService) {}

  async ngOnInit() {
    this.logObs = this.auth.isLoggedIn().subscribe(isLoggedIn => {
      console.log(this.loggedIn);
      this.loggedIn = isLoggedIn;
    });
  }

  successCallback(ev: FirebaseUISignInSuccessWithAuthResult) {
    this.loggedIn = true;
    this.snack.open(
      `🎉🎉🎉 Welcome ${ev.authResult.user.displayName} 🎉🎉🎉`,
      null,
      {
        duration: 3000,
        horizontalPosition: "center"
      }
    );
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
