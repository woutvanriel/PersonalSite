import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Input() text = '';
  @Output() chosen = new EventEmitter<boolean>();

  choose(val: boolean) {
    this.chosen.emit(val);
  }
}
