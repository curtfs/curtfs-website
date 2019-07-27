import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireFunctions } from "@angular/fire/functions";
import { MatSnackBar } from "@angular/material";
import { take } from "rxjs/operators";

@Component({
  selector: "curt-registerations",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterationComponent {
  basicInfoForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(12),
      Validators.pattern(/(201)[0-9]{9}/g)
    ]),
    university: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required]),
    faculty: new FormControl("", [Validators.required]),
    birthDate: new FormControl("", [Validators.required]),
    gradYear: new FormControl("", [Validators.required])
  });

  addInfoForm = new FormGroup({
    address: new FormControl("", [Validators.required]),
    familyOutside: new FormControl("", [Validators.required]),
    lastYearGrade: new FormControl("", [Validators.required]),
    englishLevel: new FormControl("", [Validators.required]),
    experience: new FormControl("", [Validators.required]),
    mySelf: new FormControl("", [Validators.required]),
    team1: new FormControl("", [Validators.required]),
    team2: new FormControl("", [Validators.required])
  });

  businessForm = new FormGroup({
    businessSubteam: new FormControl("", [Validators.required]),
    talkBusiness: new FormControl("", [Validators.required])
  });

  operationsForm = new FormGroup({
    operationsSubteam: new FormControl("", [Validators.required]),
    talkOperations: new FormControl("", [Validators.required]),
    hoursToCURT: new FormControl("", [Validators.required]),
    joinCURT: new FormControl("", [Validators.required]),
    learnCURT: new FormControl("", [Validators.required])
  });

  isSubmitted = false;

  constructor(private aff: AngularFireFunctions, private snack: MatSnackBar) {}

  getName() {
    return this.basicInfoForm.get("name").value;
  }

  isBusinessChosed() {
    return (
      this.addInfoForm.get("team1").value.includes("business") ||
      this.addInfoForm.get("team2").value.includes("business")
    );
  }

  isOperationsChosed() {
    return (
      this.addInfoForm.get("team1").value.includes("operations") ||
      this.addInfoForm.get("team2").value.includes("operations")
    );
  }

  submitForm() {
    const rf = this.aff.httpsCallable("registerForm");

    const aggregatedFormData = {
      ...this.basicInfoForm.value,
      ...this.addInfoForm.value,
      ...this.businessForm.value,
      ...this.operationsForm.value
    };

    // console.log(aggregatedFormData);
    aggregatedFormData.birthDate = aggregatedFormData.birthDate.toDateString();
    this.isSubmitted = true;
    rf(aggregatedFormData)
      .pipe(take(1))
      .subscribe(
        res => {
          if (res.success) {
            this.snack.open(
              `Submitted successfully, we will contact you soon. 🏎`,
              null,
              {
                duration: 5 * 1000
              }
            );
          } else {
            this.snack.open(
              `Something went wrong 😕, maybe try again in a second or two. ⏳`,
              null,
              {
                duration: 5 * 1000
              }
            );
            this.isSubmitted = false;
          }
        },
        err => {
          if (err) {
            this.snack.open(
              `Something went wrong 😕, maybe try again in a second or two. ⏳`,
              null,
              {
                duration: 5 * 1000
              }
            );
            this.isSubmitted = false;
          }
        },
        () => {}
      );
  }
}
