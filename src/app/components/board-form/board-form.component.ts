import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Board } from '../board/Board';
import { boardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent {
  newBoardForm: FormGroup;
  @Output() change: EventEmitter<Board> = new EventEmitter<Board>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private boardService: boardService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.newBoardForm = this.formBuilder.group({
      name: [''],
    });
  }

  saveForm() {
    const name = this.newBoardForm.get('name')!.value;

    this.newBoard(
      new Board({ _id: this.boardService.getCurrentId() + 1, _name: name })
    );
    this.newBoardForm.reset();
  }

  newBoard(board: Board) {
    this.boardService.setBoard(board);
    this.change.emit(board);
  }

  cancelForm() {
    this.cancel.emit(true);
  }
}
