import { Injectable } from "@angular/core";

export interface MazeCoordinate {
  x: number;
  y: number;
}

@Injectable({
  providedIn: "root"
})
export class MazeService {
  LEFT = 0b0001; //1
  RIGHT = 0b0010; //2
  BOTTOM = 0b0100; //4
  TOP = 0b1000; //8

  currentSeed: number;
  maze: any[][];
  MAZE_SIZE: number;

  constructor() {}

  public static srand(seed: number) {
    const x = Math.sin(seed) * 1e5;
    return x - Math.floor(x);
  }

  private random() {
    return MazeService.srand(this.currentSeed);
  }

  public generate(seed: number, size: number) {
    this.MAZE_SIZE = size;
    this.currentSeed = seed;
    this.maze = new Array(size);

    let seen = {};
    for (let i = 0; i < this.MAZE_SIZE; ++i) {
      this.maze[i] = new Array(this.MAZE_SIZE);
      for (let j = 0; j < this.MAZE_SIZE; ++j) {
        this.maze[i][j] = this.LEFT | this.TOP | this.BOTTOM | this.RIGHT;
        seen[this.hashKeyForCoord({ x: i, y: j })] = false;
      }
    }

    const stack = [];
    let coord: MazeCoordinate = { x: 0, y: 0 };
    let nextCoord;
    let seenCount = 0;
    while (seenCount < size * size) {
      if (!seen[this.hashKeyForCoord(coord)]) {
        ++seenCount;
      }
      seen[this.hashKeyForCoord(coord)] = true;

      const brokeWall = this.breakRandomWall(coord, seen);
      if (brokeWall) {
        stack.push(coord);
        nextCoord = this.coordForDirection(coord, brokeWall);
      } else {
        nextCoord = stack.pop();
      }
      coord = nextCoord;
    }
  }

  private hashKeyForCoord(c: MazeCoordinate) {
    return c.x + "," + c.y;
  }

  private breakRandomWall(coord: MazeCoordinate, seen: {}) {
    var y = coord.y;
    var x = coord.x;
    var walls = this.maze[y][x];
    if (walls > 0) {
      var directions = [this.LEFT, this.TOP, this.BOTTOM, this.RIGHT];
      this.shuffleArray(directions);

      for (let wall of directions) {
        if (x == 0 && wall == this.LEFT) continue;
        if (x >= this.MAZE_SIZE - 1 && wall == this.RIGHT) continue;
        if (y == 0 && wall == this.TOP) continue;
        if (y >= this.MAZE_SIZE - 1 && wall == this.BOTTOM) continue;
        const otherWall = this.coordForDirection(coord, wall);
        if (!otherWall) continue;
        if (seen[this.hashKeyForCoord(otherWall)]) continue;
        if ((walls & wall) > 0) {
          // wall is not broken
          this.maze[y][x] ^= wall;
          if (otherWall) {
            this.maze[otherWall[1]][otherWall[0]] ^= this.oppositeDirection(
              wall
            );
          }
          return wall;
        }
      }
    }
    return 0;
  }

  public drawMaze(ctx: CanvasRenderingContext2D) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var gridSize = width / this.MAZE_SIZE;
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.moveTo(0, gridSize);
    for (var y = 0; y < this.MAZE_SIZE; ++y) {
      for (var x = 0; x < this.MAZE_SIZE; ++x) {
        var item = this.maze[y][x];
        if ((item & this.BOTTOM) > 0) {
          ctx.moveTo(x * gridSize, (y + 1) * gridSize);
          ctx.lineTo((x + 1) * gridSize, (y + 1) * gridSize);
        }
        if ((item & this.RIGHT) > 0) {
          ctx.moveTo((x + 1) * gridSize, y * gridSize);
          ctx.lineTo((x + 1) * gridSize, (y + 1) * gridSize);
        }
      }
    }
    ctx.stroke();
  }

  public hasWall(pos: MazeCoordinate, direction: number) {
    var walls = this.maze[pos.y][pos.x];
    return (walls & direction) > 0;
  }

  private oppositeDirection(direction: number) {
    switch (direction) {
      case this.LEFT:
        return this.RIGHT;
      case this.RIGHT:
        return this.LEFT;
      case this.TOP:
        return this.BOTTOM;
      case this.BOTTOM:
        return this.TOP;
    }
  }

  private coordForDirection(coord: MazeCoordinate, direction: number) {
    let nextCoord: MazeCoordinate = { x: coord.x, y: coord.y };
    switch (direction) {
      case this.TOP:
        nextCoord.y--;
        break;
      case this.LEFT:
        nextCoord.x--;
        break;
      case this.BOTTOM:
        nextCoord.y++;
        break;
      case this.RIGHT:
        nextCoord.x++;
        break;
    }
    if (
      nextCoord.x < 0 ||
      nextCoord.x >= this.MAZE_SIZE ||
      nextCoord.y < 0 ||
      nextCoord.y >= this.MAZE_SIZE
    )
      return false;

    return nextCoord;
  }

  private shuffleArray(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(this.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  public getRandomColor(seed: number) {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(MazeService.srand(seed) * 16)];
      ++seed;
    }
    return color;
  }

  public moveRight() {}

  public moveLeft() {}

  public moveUp() {}

  public moveDown() {}
}
