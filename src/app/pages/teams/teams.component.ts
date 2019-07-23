import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs/operators";

const fullTeamNames = {
  aero: "Aerodynamics",
  brakes: "Brakes",
  chassis: "Chassis",
  cooling: "Cooling",
  transmission: "Transmission",
  suspension: "Suspension",
  electrical: "Electrical"
};

const teamPics = {
  aero: "assets/teams/aero.jpg",
  brakes: "assets/teams/brakes.jpg",
  chassis: "assets/teams/chassis.jpg",
  cooling: "assets/teams/cooling.jpg",
  transmission: "assets/teams/transmission.jpg",
  suspension: "assets/teams/suspension.jpg",
  electrical: "assets/teams/electrical.jpg"
};

@Component({
  selector: "curt-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.css"]
})
export class TeamsComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  validTeams = [
    "aero",
    "brakes",
    "chassis",
    "cooling",
    "transmission",
    "suspension",
    "electrical"
  ];

  team: string;
  teamTitle: string;
  teamInfo: string;
  teamImg: string;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  async ngOnInit() {
    this.team = this.ar.snapshot.paramMap.get("team");

    if (!this.team || this.validTeams.indexOf(this.team) == -1) {
      setTimeout(async () => {
        await this.router.navigateByUrl("");
      }, 5 * 1000);
      const snackref = this.snack.open(
        `You came to this page by accident, make sure to follow the qr code to see the desired team`,
        null,
        {
          duration: 5 * 1000
        }
      );

      return;
    }

    const isElectrical = this.team === "electrical";

    if (isElectrical) {
      this.teamInfo = `This team has been through it all. It was never easy for them to bring about change, since this year was our first year going full EV! They spent over 4,320 hours of hard work to bring the system to life. Their challenges were impossible, but we just don’t understand the meaning of impossible! Hit them up in our pit to know the full story.`;
    } else {
      this.teamInfo = `We’re more than just wheels! Behind the awesome car you see right in front of you, there has been a team of 60 members standing strong to bring our baby all the way to you from Giza, Egypt. If you want to know them more, and listen to their stories about the endless nights they spent on building this part; just ask around for them in our pit.`;
    }

    this.teamImg = teamPics[this.team];

    // capitalize the name
    this.team = fullTeamNames[this.team];

    this.teamTitle = `Meet the ${this.team} team`.toUpperCase();
  }
}
