import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() showLabel = false;
  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';

  @Output() changeTrigger = new EventEmitter();

  onKeyUp(event: Event): void {
    this.changeTrigger.emit((event.target as HTMLInputElement).value.trim());
  }

}
