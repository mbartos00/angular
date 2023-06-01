import { Component, OnInit } from '@angular/core';
import { Board } from '../board/Board';
import { ActivatedRoute, Router } from '@angular/router';
import { boardService } from '../../services/board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskListService } from '../../services/task-list.service';
import { TaskList } from '../task-list/task-list';
import {
  faTrash,
  faEdit,
  faPlus,
  faRemove,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;
  faRemove = faRemove;
  boardId: number;
  board: Board;
  taskLists: TaskList[] = [];
  taskListsCdkIds: string[] = [];
  isFormOn: boolean = false;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: boardService,
    private taskListService: TaskListService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.boardId = params['id'];
      this.board = this.boardService.getBoard(this.boardId);
    });

    this.taskLists = this.taskListService.getTaskLists(this.boardId) || [];
    this.updateCdkIds();
  }

  remove() {
    if (window.confirm(`Delete board '${this.board.name}'?`) === true) {
      this.boardService.removeBoard(this.board.id);
      this.router.navigate(['']);
    }
  }

  showForm() {
    this.isFormOn = true;
  }

  closeForm(close: boolean) {
    if (close === true) {
      this.isFormOn = false;
    }
  }

  updateTaskLists(taskList: TaskList) {
    if (taskList.id) {
      this.taskLists.unshift(taskList);
      this.updateCdkIds();
      this.isFormOn = false;
    }
  }

  reloadTaskLists() {
    this.taskLists = this.taskListService.getTaskLists(this.boardId) || [];
  }

  onTaskListDrop(event: CdkDragDrop<TaskList[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.taskListService.setTaskLists(this.boardId, event.container.data);
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  editBoard(newTitle: string) {
    this.boardService.editBoard(this.boardId, newTitle);
    this.isEdit = false;
    this.board.name = newTitle;
  }

  private updateCdkIds() {
    this.taskListsCdkIds =
      this.taskLists.map((taskList) => `taskList_${taskList.id}`) || [];
  }
}
