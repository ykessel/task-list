import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  showAction = false;
  tasks: string[] = [];
  // text: string =
  //   "#Important Write to some_email@gmail.com and tell @natasha about https://staging.alldone.app";
  displayTextInput: string = "";
  taskTextInput: string = "";
  indexTaskSelected: number = 0;
  editTask = "";
  editMode = 0;

  taskForm = this.formBuilder.group({
    inputTask: "",
  });

  constructor(private formBuilder: FormBuilder) {}

  setActionVisible() {
    this.showAction = true;
  }

  selected(index: number) {
    this.editMode = 1;
    this.indexTaskSelected = index;
    this.editTask = this.tasks[index];
  }

  addOrUpdateTask() {
    console.log(
      "this.taskTextInput en addOrUpdateTask() --> ",
      this.taskTextInput
    );
    if (this.editMode == 1 && this.taskTextInput !== "") {
      this.tasks[this.indexTaskSelected] = this.taskTextInput;
      this.editMode = 0;
    } else {
      if (
        this.taskForm.controls.inputTask.value !== null &&
        this.taskTextInput !== ""
      ) {
        this.tasks.push(this.taskTextInput);
      }
    }
    this.taskForm.reset();
    this.displayTextInput = "";
    this.taskTextInput = "";
  }

  textTransform(text: string, to: number) {
    let temp: string[] = text.split(" ");
    let res: string = "";

    if (to == 0) {
      let txt: string = "";
      temp.forEach((el: string) => {
        if (el.startsWith("@")) {
          txt = txt.concat(` <span class='color-user'>${el}</span>`);
        } else if (el.startsWith("#")) {
          txt = txt.concat(` <span class='color-important'>${el}</span>`);
        } else {
          txt = txt.concat(` ${el}`);
        }
      });

      res = `<p>${txt}</p>`;
    } else {
      let txt: string = "";
      temp.forEach((el: string) => {
        if (el.startsWith("@")) {
          txt = txt.concat(
            `<span class='user-chip task-chip color-user'><img
          [class.disabled-img]="input.value == ''"
          width="20"
          height="20"
          src="https://material.angular.io/assets/img/examples/shiba2.jpg"
        />${el.replace("@", " ")}</span>`
          );
          console.log(txt);
        } else if (el.startsWith("#")) {
          txt = txt.concat(
            `<span class='important-chip task-chip color-important'>${el.replace("#", "# ")}</span>`
          );
        } else if (el.startsWith("https://")) {
          txt = txt.concat(`<span class='link-chip task-chip color-link'><svg class="feather-sprite color-link">
  <use href="../assets/feather-sprite.svg#link"/>
</svg> mylink</span>`);
        } else if (el.startsWith("http://")) {
          txt = txt.concat(`<span class='link-chip task-chip color-link'><svg class="feather-sprite color-link">
  <use href="../assets/feather-sprite.svg#link"/>
</svg> mylink</span>`);
        } else if (el.includes("@")) {
          txt = txt.concat(`<span class='email-chip task-chip color-email'><svg class="feather-sprite color-email">
  <use href="../assets/feather-sprite.svg#mail"/>
</svg> mymail</span>`);
        } else if (el !== "") {
          txt = txt.concat(`<p>${el}</p>`);
        }
      });
      res = txt;
    }
    return res;
  }

  sendText(txt: string) {
    if (txt !== " ") {
      this.displayTextInput = this.displayTextInput.concat(
        this.textTransform(txt, 0)
      );
      this.taskTextInput = this.taskTextInput.concat(" " + txt);
    }
    this.taskForm.reset();
  }

  deleteLetterDisplayTextInput() {
    let open = /\<(.*?)\>/g;
    let close = /\<\/(.*?)\>/g;
    let checkOpen = this.displayTextInput.match(open);
    let checkClose = this.displayTextInput.match(close);
    let temp: string[] = [];

    if (
      this.taskForm.value.inputTask == "" ||
      this.taskForm.value.inputTask == null
    ) {
      Array.from(this.displayTextInput).forEach((letter: string) => {
        let exitsInTagOpen = checkOpen!.some((x: string) => x.includes(letter));
        let exitsInTagClose = checkClose!.some((x: string) =>
          x.includes(letter)
        );
        if (!exitsInTagOpen || !exitsInTagClose) {
          temp.push(letter);
        }
      });
    }

    let lastChar = this.displayTextInput.lastIndexOf(temp.reverse()[0]);

    if (temp.reverse().length > 0) {
      console.log(lastChar);
      this.displayTextInput =
        this.displayTextInput.substr(0, lastChar) +
        this.displayTextInput.substr(
          lastChar + 1,
          this.displayTextInput.length
        );
      // console.log(temp.reverse()[0])
    }

    // console.log("displayTextInput: ", this.displayTextInput);
    // console.log("lastChar - 1: ", this.displayTextInput.slice(0, lastChar - 1))
    // console.log("lastChar + 1: ", this.displayTextInput.slice(lastChar + 1, this.displayTextInput.length));
  }
}
