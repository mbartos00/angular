import { Component } from '@angular/core';
import { Board } from '../board/Board';
import { boardService } from '../../services/board.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskList } from '../task-list/task-list';
import { TaskService } from 'src/app/services/task.service';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent {
  faPlus = faPlus;
  boards: Board[] = [];
  isFormOn: boolean = false;

  constructor(private boardService: boardService) {}

  ngOnInit() {
    if (this.boardService.hasBoards())
      this.boards = this.boardService.getAllBoards();
  }

  showForm() {
    this.isFormOn = true;
  }

  updateBoards(board: Board) {
    if (board.id) {
      this.boards.unshift(board);
      this.isFormOn = false;
    }
  }

  closeForm(close: boolean) {
    if (close === true) this.isFormOn = false;
  }
}
