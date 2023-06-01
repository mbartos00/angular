import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from './task';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  faEdit = faEdit;
  faRemove = faRemove;
  @Input() title = '';
  @Input() details = '';
  @Input() canRemove = false;
  @Input() canEdit = false;
  @Input() boardId: number;
  @Input() taskListId: number;
  @Input() taskId: number;

  @Output() shouldUpdate = new EventEmitter<void>();

  isEditable = false;

  constructor(private taskService: TaskService) {}

  removeTask() {
    if (window.confirm(`Delete task '${this.title}'?`) === true) {
      this.taskService.removeTask(this.boardId, this.taskListId, this.taskId);
      this.shouldUpdate.emit();
    }
  }

  editTask() {
    this.isEditable = true;
  }

  closeForm(close: boolean) {
    if (close === true) this.isEditable = false;
  }

  editedTask(task: Task) {
    if (task instanceof Task) {
      this.title = task.title;
      this.details = task.details;
      this.shouldUpdate.emit();
      this.isEditable = false;
    }
  }
}
