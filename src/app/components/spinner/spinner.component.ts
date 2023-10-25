import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('trigger', [
      state('opened', style({ opacity: 1 })
      ),
      state('closed', style({ opacity: 0 })
      ),
      transition('opened <=> closed', animate('250ms'))
    ])
  ]
})
export class SpinnerComponent implements OnInit {
  opened = 'closed';
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.opened = 'opened';
    });
  }
}
