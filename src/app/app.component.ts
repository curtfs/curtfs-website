import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AngularFireAuth } from "@angular/fire/auth";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { AuthService } from "./services/auth.service";
import { IDBService } from "./services/idb.service";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";

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
  showFooter = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService,
    private title: Title,
    private idb: IDBService,
    private analytics: Angulartics2GoogleAnalytics
  ) {
    this.title.setTitle(
      `CURT'${new Date()
        .getFullYear()
        .toString()
        .slice(2, 4)} | Official Website`
    );

    this.analytics.startTracking();

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
            console.log(this.page);
            this.showFooter = !(this.page === "/");
          }
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  async ngOnInit() {
    const isMessagingEnabled = await this.idb.hasKey("m");
    if (!isMessagingEnabled) {
      const isRevisit = await this.idb.hasKey("v");
      if (!isRevisit) {
        await this.idb.setKey("v", 1);
      } else {
        const visits = await this.idb.getDataByKey<number>("v");
        this.idb.setKey("v", visits + 1);
      }
    }
  }

  public async logout() {
    await this.auth.logout();
  }
}
