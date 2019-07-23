import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  OnDestroy
} from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { MazeService, MazeCoordinate } from "src/app/services/maze.service";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { firestore } from "firebase";

export interface MazeUser {
  uid: number;
  pos: MazeCoordinate;
}

// maximum users in a maze game is 4 (for now)
export interface MazeGame {
  master: number;
  users?: MazeUser[];
  seed: number;
}

function delay(seconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

@Component({
  selector: "curt-maze-canvas",
  templateUrl: "./maze-canvas.component.html",
  styleUrls: ["./maze-canvas.component.css"]
})
export class MazeCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("theMaze", { read: ElementRef, static: false })
  mazeCanvas: ElementRef<HTMLCanvasElement>;
  public ctx: CanvasRenderingContext2D;
  @ViewChild("players", { read: ElementRef, static: false })
  playersDiv: ElementRef<HTMLDivElement>;

  uid: number;
  myPos: MazeCoordinate;
  mazeSeed: number;
  gridSize: number;
  size = 16;
  playersMap: Map<number, MazeUser>;

  gameref: AngularFirestoreDocument<MazeGame>;

  constructor(
    private afs: AngularFirestore,
    private mazeUtils: MazeService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private snack: MatSnackBar
  ) {}

  async ngOnInit() {
    this.uid = Math.floor(Math.random() * 1e5);
    this.myPos = { x: 0, y: 0 };
    this.playersMap = new Map<number, MazeUser>();
  }

  createPlayer(playerUid: number) {
    const player = this.renderer.createElement("div");
    this.renderer.setAttribute(player, "id", `player${playerUid}`);
    this.renderer.addClass(player, "player");
    this.renderer.setStyle(
      player,
      "background-color",
      this.mazeUtils.getRandomColor(playerUid)
    );
    this.renderer.appendChild(this.playersDiv.nativeElement, player);
  }

  createPrize() {
    const prize = this.renderer.createElement("div");
    const car = this.renderer.createText("🏎");
    this.renderer.addClass(prize, "player");
    this.renderer.appendChild(this.playersDiv.nativeElement, prize);
  }

  clearMaze() {
    this.myPos.x = 0;
    this.myPos.y = 0;
    this.playersMap.clear();

    this.playersDiv.nativeElement.innerHTML = ""; // clear the html
    this.createPrize();
  }

  handleGame() {
    const gameID = this.route.snapshot.paramMap.get("id");
    if (!gameID) {
      this.startNewGame();
    } else {
      this.joinGame(gameID);
    }
  }

  async startNewGame() {
    const newGameID = Math.floor(Math.random() * 1000000);
    await this.router.navigate(["maze", newGameID]);
  }

  joinGame(gameID: string) {
    this.gameref = this.afs.collection("Maze").doc<MazeGame>(gameID);

    // conditionally use the clipboard to not break safari
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          this.snack.open(
            `Copied this game link, share it with your friends to come here and play`,
            "okay",
            {
              duration: 5000
            }
          );
        })
        .catch(err => {
          this.snack.open(
            `Failed to copy the game link due to ${err.toString()}`,
            "okay",
            {
              duration: 3000
            }
          );
        });
    }

    this.gridSize = this.ctx.canvas.width / this.size;
    this.monitorBoard();
  }

  monitorBoard() {
    this.gameref.valueChanges().subscribe(async data => {
      if (!data) {
        this.mazeSeed = Math.floor(Math.random() * 1e5);
        const masterUser: MazeUser = {
          uid: this.uid,
          pos: this.myPos
        };
        debugger;
        await this.gameref.set({
          seed: this.mazeSeed,
          users: [masterUser],
          master: masterUser.uid
        });
        this.clearMaze();
        this.mazeSeed = data.seed;
        this.mazeUtils.generate(this.mazeSeed, this.size);
        this.mazeUtils.drawMaze(this.ctx);
        return;
      }

      for (let player of data.users) {
        if (player.uid != this.uid && !this.playersMap.has(player.uid)) {
          this.playersMap.set(player.uid, player);
          this.createPlayer(player.uid);
        }
      }
      this.updatePlayerLocations();
    });
  }

  updatePlayerLocations() {
    this.playersMap.forEach((val, key) => {
      const playerDiv = this.playersDiv.nativeElement.querySelector(
        `#player${key}`
      );

      const circleSize = 10;
      const nudge = this.gridSize * 0.25;

      const offsetx =
        nudge -
        2 * MazeService.srand(this.uid) * nudge -
        circleSize / 2 +
        this.gridSize / 2;

      const offsety =
        nudge -
        2 * MazeService.srand(this.uid + 1) * nudge -
        circleSize / 2 +
        this.gridSize / 2;

      const left = val.pos.x * this.gridSize + offsetx;
      const top = val.pos.y * this.gridSize + offsety;
      debugger;
      (playerDiv as any).style.top = `${top}px`;
      (playerDiv as any).style.left = `${left}px`;
      (playerDiv as any).style.width = `${top}px`;
      (playerDiv as any).style.height = `${circleSize}px`;
    });
  }

  updateMyLocation() {}

  monitorPlayers() {}

  goRight() {
    this.myPos.x++;
    this.updateMyLocation();
  }

  goLeft() {
    this.myPos.x--;
    this.updateMyLocation();
  }

  goUp() {
    this.myPos.y--;
    this.updateMyLocation();
  }

  goDown() {
    this.myPos.y++;
    this.updateMyLocation();
  }

  ngAfterViewInit() {
    this.ctx = this.mazeCanvas.nativeElement.getContext("2d");
    this.handleGame();
  }

  ngOnDestroy() {
    this.gameref
      .get()
      .toPromise()
      .then(async doc => {
        const { master } = doc.data();
        if (this.uid == master) {
          await this.gameref.delete();
          this.snack.open(
            `You left the game, now the game is over. will see you again, won't we? 😀`,
            `Insha'allah`,
            { duration: 5000 }
          );
          await delay(10); // in seconds
          this.router.navigateByUrl("/");
        }
      });
  }
}
