import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-list';
  tasks = ['Task 1', 'Task 2', 'Task 3'];

  taskForm = this.formBuilder.group({
    inputTask: '',
  });

  constructor(private formBuilder: FormBuilder) {}


  addTask() {
    if(this.taskForm.controls.inputTask.value !== null) {
      this.tasks.push(this.taskForm.controls.inputTask.value);
    }
    this.taskForm.reset()
  }
}
