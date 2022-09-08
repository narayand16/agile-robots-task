import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() showLabel = false;
  @Input() label = '';
  @Input() debounceTime = 500;
  @Input() value = '';
  @Input() placeholder = '';

  @Output() changeTrigger = new EventEmitter();

  ngOnInit(): void {
  }

  onKeyUp(event: Event): void {
    this.changeTrigger.emit((event.target as HTMLInputElement).value.trim());
  }

}
