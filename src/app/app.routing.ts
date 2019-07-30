import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NetworkAwarePreloader } from "./preload.module";
import { environment } from "src/environments/environment";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "about",
    loadChildren: () =>
      import("./pages/about/about.module").then(m => m.AboutModule)
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./pages/contact/contact.module").then(m => m.ContactModule)
  },
  {
    path: "history",
    loadChildren: () =>
      import("./pages/history/history.module").then(m => m.HistoryModule)
  },
  {
    path: "media",
    loadChildren: () =>
      import("./pages/media/media.module").then(m => m.MediaModule)
  },
  {
    path: "sponsors",
    loadChildren: () =>
      import("./pages/sponsors/sponsors.module").then(m => m.SponsorsModule)
  },
  {
    path: "teams/:team",
    loadChildren: () =>
      import("./pages/teams/team.module").then(m => m.TeamsModule)
  },
  {
    path: "recruit",
    loadChildren: () =>
      import("./pages/registeration/register.module").then(
        m => m.RegisterationModule
      )
  },
  /* { path: "maze", redirectTo: "maze/" },
  {
    path: "maze/:id",
    loadChildren: () =>
      import("./pages/maze/maze.module").then(m => m.MazeModule)
  }, */
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled",
      useHash: false,
      preloadingStrategy: NetworkAwarePreloader
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
