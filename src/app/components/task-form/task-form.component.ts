import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../task/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  newTaskForm: FormGroup;
  selectColor = 'primary';

  @Input() taskListId: number;
  @Input() boardId: number;
  @Input() title = '';
  @Input() details = '';
  @Input() taskId: number;

  @Output() change: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.newTaskForm = this.formBuilder.group({
      title: [this.title],
      details: [this.details],
    });
  }

  saveForm() {
    const title = this.newTaskForm.get('title')!.value;
    const details = this.newTaskForm.get('details')!.value;

    if (this.taskId === null) {
      this.newTask(
        new Task({
          _id: this.taskService.getCurrentId(this.boardId, this.taskListId) + 1,
          _title: title,
          _details: details,
        })
      );

      this.newTaskForm.reset();
    } else {
      this.updateTask(
        new Task({
          _id: this.taskId,
          _title: title,
          _details: details,
        })
      );
    }
  }
  storeTask() {
    const tasks = this.taskService.getTasks(this.boardId, this.taskListId);
    this.taskService.pushTask(this.boardId, this.taskListId, tasks[0]);
  }
  newTask(task: Task) {
    this.taskService.pushTask(this.boardId, this.taskListId, task);
    this.change.emit(task);
  }

  updateTask(task: Task) {
    this.taskService.editTask(this.boardId, this.taskListId, task);
    this.change.emit(task);
  }

  cancelForm() {
    this.cancel.emit(true);
  }
}
