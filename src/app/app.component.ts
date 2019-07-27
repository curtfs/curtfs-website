import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, filter } from "rxjs/operators";
import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { AuthService } from "./services/auth.service";
import { Title } from "@angular/platform-browser";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "curt-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [AngularFireAuth]
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  loggedIn = false;
  loading = false;
  page = "/";
  showFooter = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService,
    private title: Title
  ) {
    this.title.setTitle(
      `CURT'${new Date()
        .getFullYear()
        .toString()
        .slice(2, 4)} | Official Website`
    );

    this.router.events.subscribe((ev: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          if (ev.url) {
            this.page = ev.url;
            this.showFooter = !(this.page == "/");
          }
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(isL => {
      this.loggedIn = isL;
    });
  }

  public async logout() {
    await this.auth.logout();
  }
}
