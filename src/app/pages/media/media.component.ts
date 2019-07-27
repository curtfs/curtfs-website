import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, take } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "curt-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.css"]
})
export class MediaComponent implements OnInit, OnDestroy {
  photos = [];
  ytvids = [];
  fbvids = [];
  appear = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private afs: AngularFireStorage,
    private sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
    private afd: AngularFireDatabase
  ) {}

  async ngOnInit() {
    const photosToDownload = Array(66)
      .fill(0)
      .map((_, i) => ({
        src: `${String(i + 1).padStart(4, "0")}.jpg`
      }));

    this.photos = this.chunk(photosToDownload, 6);
  }

  loadVideos() {
    if (this.ytvids.length > 0) {
      return;
    }
    this.ytvids = [
      "aHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvTkJUYkxCUnRTVmM=",
      "aHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvWkhkdG1VZHFpdXc=",
      "aHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvT25qOXFHemVtWkE=",
      "aHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvOHY3c04tYzZTd3c=",
      "aHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvUnNCUjBtNHhjVlE="
    ]
      .map(atob)
      .map(link => this.sanitizer.bypassSecurityTrustResourceUrl(link));

    this.fbvids = [
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzIzNjg3MTE2OTY1Nzk0MjAv",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzIxODgxMDYwNzQ1NTg1NDcv",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzI4NDg5NTY4ODkyOTg3NC8=",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzQxODUwMDQxODk1MjQ1Ni8=",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzc3Mjc0MzQyMzEyNDk0NS8=",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzk3MzY4NDM3NjE1NTg1Ny8=",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzIxMzcwNDE5ODMwMjY4ODEv",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzE5NTIzMzU5MzgxNTUzOTAv",
      "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2N1cnQuZnMvdmlkZW9zLzIwNTYwODc1NjQ0ODUyNTEv"
    ]
      .map(atob)
      .map(link => this.sanitizer.bypassSecurityTrustResourceUrl(link));
  }

  loadArticles() {
    if (this.appear.length > 0) {
      return;
    }
    const articlesList = this.afd.list("/static/articles");
    const articles = articlesList
      .valueChanges()
      .pipe(take(1))
      .toPromise();

    articles.then(arts => {
      this.appear = arts;
      console.log(arts);
    });
  }

  ngOnDestroy() {}

  async lazyImage({ target, visible }) {
    if (visible && !target.src) {
      const imageUrl = `photos/${target.dataset.lazy}`;
      delete target.dataset.lazy;

      console.log(`Lazy Loaded this image: ${imageUrl}`);
      const imgRef = this.afs.ref(imageUrl);
      const imageSrcProm = imgRef
        .getDownloadURL()
        .pipe(take(1))
        .toPromise();

      target.src = await imageSrcProm;
    }
  }

  chunk(arr: any[], chunkSize: number) {
    const chunks = [];

    for (let i = 0, len = arr.length; i < len; i += chunkSize)
      chunks.push(arr.slice(i, i + chunkSize));

    return chunks;
  }
}
