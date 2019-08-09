import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, ɵDomSanitizerImpl } from "@angular/platform-browser";

const html = String.raw;

@Pipe({
  name: "coolpipe"
})
export class CoolpipePipe implements PipeTransform {
  constructor(private san: DomSanitizer) {}

  transform(obj: any, ...args: any[]): any {
    // console.log(obj);
    let template = "<pre style='margin:0;white-space: pre-wrap;'>";
    const keys = Object.keys(obj);

    for (const key of keys) {
      const value = obj[key];
      if (["created_at", "index", "form_type", "id", "status"].includes(key)) {
        continue;
      }

      if (Array.isArray(value)) {
        if (typeof value[0] === "string") {
          template += `${key}: ${JSON.stringify(value)}\n\n`;
        } else {
          template += `${key}\n`;
          for (let single of value) {
            template += `\t${single.name}: ${single.value}\n`;
          }
          template += "\n";
        }

        continue;
      }

      template += `${key}: ${value}\n\n`;
    }

    template += "</pre>";
    return this.san.bypassSecurityTrustHtml(template);
  }
}
