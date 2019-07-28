import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "curt-dialog",
  templateUrl: "./dialog.component.html"
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  yesClick() {
    this.dialogRef.close("yes");
  }

  noClick() {
    this.dialogRef.close("no");
  }
}
