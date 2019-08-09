import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, takeWhile } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure
} from "firebaseui-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatSelectChange
} from "@angular/material";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { CoolpipePipe } from "../../pipes/coolpipe.pipe";

@Component({
  selector: "curt-view-tables",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"],
  providers: [CoolpipePipe],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ViewComponent implements OnInit, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  displayedColumns = ["id", "name", "email", "actions"];
  dataSource: MatTableDataSource<any>;
  private _data: any[];
  expandedUser: any;

  loggedIn = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private breakpointObserver: BreakpointObserver
  ) {}

  async ngOnInit() {}

  async ngAfterViewInit() {
    this.afauth.authState
      .pipe(takeWhile(val => !!val))
      .subscribe(async data => {
        if (!data) {
          return;
        }

        this.loggedIn = true;
        const ref = this.afs.collection("Recruitment2020");

        /*  const users = await ref.ref.limit(10).get();
        const x = users.docs;
        const z = x.map((y, i) => {
          return {
            index: i + 1,
            ...y.data(),
            id: y.id
          };
        });

        this._data = z;
        this.dataSource = new MatTableDataSource<any>(
          z.filter((user: any) => user.status === "PENDING")
        );

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges(); */

        ref
          .snapshotChanges()
          .pipe(
            map(val => {
              return val.map((obj, index) => {
                return {
                  ...obj.payload.doc.data(),
                  id: obj.payload.doc.id,
                  index: index + 1
                };
              });
            })
          )
          .subscribe(data => {
            this._data = data;
            this.dataSource = new MatTableDataSource<any>(
              data.filter((user: any) => user.status === "PENDING")
            );

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
          });
      });
  }

  updateApplicantsList(event: MatSelectChange) {
    console.log(event.value);
    const type: string = event.value;
    console.table(this._data);
    const filteredData = this._data.filter(user => user.status === type);
    this.dataSource = null;

    this.dataSource = new MatTableDataSource<any>(filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  successCallback(ev: FirebaseUISignInSuccessWithAuthResult) {
    this.loggedIn = true;
  }
  errorCallback(ev: FirebaseUISignInFailure) {
    this.loggedIn = false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async reject(person) {
    console.log("REJECTED ", person);
    await this.afs
      .collection("Recruitment2020")
      .doc(person.id)
      .update({
        status: "REJECTED"
      });
  }

  async accept(person) {
    console.log("ACCEPTED ", person);
    await this.afs
      .collection("Recruitment2020")
      .doc(person.id)
      .update({
        status: "ACCEPTED"
      });
  }
}
