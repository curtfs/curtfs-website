import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AngularFireFunctions } from "@angular/fire/functions";
import { MatSnackBar, MatSliderChange } from "@angular/material";
import { take } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

const requiredValidation = [Validators.required];

@Component({
  selector: "curt-registerations",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterationComponent implements OnInit {
  electricalTeams = [
    "Energy Storage Population",
    "Traction Control System",
    "Ground Level Voltage System (GLVS)",
    "Embedded Systems"
  ];

  electricalSoftwares = [
    "Matlab",
    "Simulink",
    "Solidworks",
    "Autodesk",
    "Proteus Design Suite",
    "Altera Max",
    "Multisim",
    "Logisim",
    "Eagle",
    "Altium Designer",
    "Circuit maker",
    "LTspice",
    "PSpice",
    "Ngspice",
    "EasyEDA",
    "Wolfram System Modeler"
  ];

  electricalStuff = [
    "Control Algorithms",
    "Power Electronics",
    "Electric Circuits",
    "Physical Modeling",
    "Electric Machines",
    "Embedded Systems",
    "Signals",
    "Message-Based Communication"
  ];

  mechanicalTeams = [
    "Suspension & Steering",
    "Brakes",
    "Chassis",
    "Aerodynamics",
    "Cooling",
    "Transmission"
  ];

  basicInfoForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(12),
      Validators.pattern(/(201)[0-9]{9}/g)
    ]),
    university: new FormControl("", requiredValidation),
    department: new FormControl("", requiredValidation),
    faculty: new FormControl("", requiredValidation),
    birth_date: new FormControl("", requiredValidation),
    grad_year: new FormControl("", requiredValidation)
  });

  businessAddInfoForm = new FormGroup({
    address: new FormControl("", requiredValidation),
    family_outside: new FormControl("", requiredValidation),
    lastyear_grade: new FormControl("", requiredValidation),
    english_level: new FormControl("", requiredValidation),
    experience: new FormControl("", requiredValidation),
    mySelf: new FormControl("", requiredValidation),
    team1: new FormControl("", requiredValidation),
    team2: new FormControl("", requiredValidation)
  });

  technicalAddInfoForm = new FormGroup({
    what_to_add: new FormControl("", requiredValidation),
    expect_to_learn: new FormControl("", requiredValidation),
    self_learning: new FormControl("", requiredValidation),
    presentation_skill: new FormControl("", requiredValidation),
    presentation_exp: new FormControl("", requiredValidation),
    technical_subteam: new FormControl("", requiredValidation)
  });

  businessForm = new FormGroup({
    business_subteam: new FormControl("", requiredValidation),
    talk_business: new FormControl("", requiredValidation)
  });

  operationsForm = new FormGroup({
    operations_subteam: new FormControl("", requiredValidation),
    talk_operations: new FormControl("", requiredValidation),
    hours_to_CURT: new FormControl("", requiredValidation),
    join_CURT: new FormControl("", requiredValidation),
    expect_learn_CURT: new FormControl("", requiredValidation)
  });

  electricalForm = new FormGroup({
    knowledge_fields: new FormArray(
      this.electricalStuff.map(_ => new FormControl(1))
    ),
    past_projects: new FormControl("", requiredValidation),
    software_knowledge: new FormArray(
      this.electricalSoftwares.map(_ => new FormControl(false))
    ),
    programming_lang: new FormControl("", requiredValidation)
  });

  mechanicalForm = new FormGroup({
    mech_prio1: new FormControl("", requiredValidation),
    mech_prio2: new FormControl("", requiredValidation),
    solidworks_prof: new FormControl("Beginner", requiredValidation),
    solidworks_exp: new FormControl("", requiredValidation),
    ansys_prof: new FormControl("Beginner", requiredValidation),
    ansys_exp: new FormControl("", requiredValidation),
    catia_prof: new FormControl("Beginner", requiredValidation),
    catia_exp: new FormControl("", requiredValidation),
    other_cad_exp: new FormControl("", requiredValidation),
    worked_project_before: new FormControl("", requiredValidation),
    manufacturing_exp: new FormControl("", requiredValidation)
  });

  isSubmitted = false;

  isTechnical = false;
  isMangarial = false;

  constructor(
    private aff: AngularFireFunctions,
    private snack: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const { type } = this.route.snapshot.data;

    this.isTechnical = type === "tech";
    this.isMangarial = !this.isTechnical;
  }

  getName() {
    return this.basicInfoForm.get("name").value;
  }

  isBusinessChosed() {
    return (
      this.isMangarial &&
      (this.businessAddInfoForm.get("team1").value.includes("business") ||
        this.businessAddInfoForm.get("team2").value.includes("business"))
    );
  }

  isOperationsChosed() {
    return (
      this.isMangarial &&
      (this.businessAddInfoForm.get("team1").value.includes("operations") ||
        this.businessAddInfoForm.get("team2").value.includes("operations"))
    );
  }

  isElectricalChosed() {
    return (
      this.isTechnical &&
      this.technicalAddInfoForm
        .get("technical_subteam")
        .value.includes("electrical")
    );
  }

  isMechanicalChosed() {
    return (
      this.isTechnical &&
      this.technicalAddInfoForm
        .get("technical_subteam")
        .value.includes("mechanical")
    );
  }

  setSliderValue(
    ev: MatSliderChange,
    form: string,
    ctrl: string | FormControl
  ) {
    if (ctrl instanceof FormControl) {
      ctrl.setValue(ev.value);
      ctrl.updateValueAndValidity();
      return;
    }

    const formG: FormGroup = this[form];
    const formC = formG.get(ctrl);

    formC.setValue(ev.value);
    formC.updateValueAndValidity();
  }

  drop(event: CdkDragDrop<string[]>) {
    // Make sure to get that into the form sent to the server
    moveItemInArray(
      this.electricalTeams,
      event.previousIndex,
      event.currentIndex
    );
  }

  submitForm() {
    const rf = this.aff.httpsCallable("registerForm");

    let aggregatedFormData = {
      ...this.basicInfoForm.value
    };

    if (this.isTechnical) {
      aggregatedFormData.form_type = "Technical";
      if (this.isElectricalChosed()) {
        aggregatedFormData = {
          ...aggregatedFormData,
          ...this.technicalAddInfoForm.value,
          ...this.electricalForm.value
        };
        aggregatedFormData.interests = this.electricalTeams;
        aggregatedFormData.knowledge_fields = aggregatedFormData.knowledge_fields.map(
          (value, i) => {
            return {
              value,
              name: this.electricalStuff[i]
            };
          }
        );
        aggregatedFormData.software_knowledge = aggregatedFormData.software_knowledge.map(
          (value, i) => {
            return {
              value,
              name: this.electricalSoftwares[i]
            };
          }
        );
      } else {
        aggregatedFormData.form_type = "Mangarial";
        aggregatedFormData = {
          ...aggregatedFormData,
          ...this.technicalAddInfoForm.value,
          ...this.mechanicalForm.value
        };
      }
    } else {
      aggregatedFormData = {
        ...aggregatedFormData,
        ...this.businessAddInfoForm.value,
        ...this.businessForm.value,
        ...this.operationsForm.value
      };
    }

    aggregatedFormData.birth_date = aggregatedFormData.birth_date.toDateString();
    console.log(aggregatedFormData);
    this.isSubmitted = true;

    rf(aggregatedFormData)
      .pipe(take(1))
      .subscribe(
        res => {
          if (res.success) {
            this.showSnack(
              `Submitted successfully, we will contact you soon. 🏎`
            );
          } else {
            this.showSnack(
              `Something went wrong 😕, maybe try again in a second or two. ⏳`
            );
            this.isSubmitted = false;
          }
        },
        err => {
          if (err) {
            this.showSnack(
              `Something went wrong 😕, maybe try again in a second or two. ⏳`
            );
            this.isSubmitted = false;
          }
        }
      );
  }

  showSnack(msg: string) {
    this.snack.open(msg, null, { duration: 5 * 1000 });
  }
}
