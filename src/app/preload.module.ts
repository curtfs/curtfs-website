import { Injectable } from "@angular/core";
import { Observable, EMPTY } from "rxjs";
import { PreloadingStrategy, Route } from "@angular/router";

function shouldPreload(route: Route): boolean {
  const conn = (navigator as any).connection;
  if (!conn) {
    return false;
  }
  if (conn.saveData) {
    return false;
  }
  if (conn.effectiveType.includes("2g")) {
    return false;
  }
  return true;
}

@Injectable({ providedIn: "root" })
export class NetworkAwarePreloader implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (shouldPreload(route)) {
      return load();
    } else {
      return EMPTY;
    }
  }
}
