import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map, take } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  public async logout() {
    await this.afAuth.auth.signOut();
    window.location.reload();
  }

  public isLoggedIn() {
    return this.afAuth.user.pipe(map(user => !!user));
  }

  public getUserUID() {
    return this.afAuth.user
      .pipe(
        take(1),
        map(user => user && user.uid)
      )
      .toPromise();
  }
}
