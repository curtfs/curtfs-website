import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireFunctions } from "@angular/fire/functions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs/operators";

export interface Question {
  text: string;
  answer: string;
}

@Component({
  selector: "curt-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  faq: Question[] = [];
  contact: FormGroup;
  loadingResponse = false;
  done = false;

  constructor(private aff: AngularFireFunctions, private snack: MatSnackBar) {}

  ngOnInit() {
    this.faq = [
      {
        text: "How to join the team?",
        answer: `You can join our family by applying for the position you want when we open our recruitment in August right after we’re back from the competition.
                 We advise you to learn the basic skills of the team you wish to join before applying as it increases your chances of acceptance.`
      },
      {
        text: "How to get prepared to join the team?",
        answer: `References, references, references! Yet the internet is a wide sea of information where you will get lost,
         so please do send us a message below telling us what team you would like to join and we’ll help you prepare for it.`
      },
      {
        text: "Why did I get refused from the primary phases?",
        answer: `Rejection is mainly because of three reasons, either the knowledge you have doesn’t meet the minimum requirements your team will need,
                 or rather because of a personality issue or finally because of competition.
                 Anyone who is rejected will definitely be sent a feedback and we’ll definitely be waiting for you the next year after you’ve worked on your cause of rejection and made it better!`
      },
      {
        text: "Why should I join the team?",
        answer: `Our team doesn’t only grant you knowledge that will change your life upside down in the automotive industry,
                 but rather also trains you by working on real life practical experience.`
      },
      {
        text: "Is this team only for engineers and mechanical students?",
        answer: `Our team is for everyone! We have two sections Technical and Non-Technical, in the technical department you get to work on the car with your bare hands,
                 let it be brakes, suspension or the engine itself. In the non-tech department, if you’re obsessed with planning and  manufacturing then our business and manufacturing department is handmade for you!
                 If you know nothing about engineering and still want to join our team, then our managerial department will welcome you with open arms where you can practice your HR, Fund, Logistics, Marketing and Media skills.`
      },
      {
        text: "Is the competition similar to F1?",
        answer: `If you think of formula student as racing cars then the answer is no.
                 Formula student is rather concerned on testing the car’s performance in static and dynamic events where each car is evaluated individually,
                 but in a way our prototypes has to be similar to F1 cars but rather in on a smaller scale.`
      }
    ];
    const params = new URLSearchParams(document.location.href.split("?")[1]);

    const intent = params.get("i");

    this.contact = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", [Validators.required]),
      intent: new FormControl(intent && intent === "s" ? "sponser" : "", []),
      message: new FormControl("", [Validators.required])
    });
  }

  submitContact(data: any) {
    if (!this.contact.valid) {
      this.snack.open(
        `Please correct the invalid field in the form first, then submit`,
        null,
        {
          duration: 3000
        }
      );
      return;
    }

    this.loadingResponse = true;

    const call = this.aff.httpsCallable("submitContactForm");
    const ret = call(data)
      .pipe(take(1))
      .toPromise();
    // aa
    ret
      .then(_ => {
        this.snack.open(
          `We have taken your message and expect to hear a response soon. 🏎️`,
          null,
          { duration: 5000 }
        );
        this.loadingResponse = false;
        this.done = true;
      })
      .catch(e => {
        console.error(e);
        this.snack.open(
          `Your message didn't quite reach us, something went wrong try again. 😱`,
          null,
          { duration: 5000 }
        );
        this.loadingResponse = false;
      });
  }

  getEmailError() {
    const email = this.contact.get("email");
    return email.hasError("email")
      ? `This doesn't look like a valid email address.`
      : null;
  }
}
