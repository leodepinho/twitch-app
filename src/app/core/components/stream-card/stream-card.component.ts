import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stream} from '../../models/stream';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.scss'],
})
export class StreamCardComponent implements OnInit {
  /**
   * Stream Object
   */
  @Input() stream: Stream;
  /**
   * Click Event
   */
  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emit event when the card is clicked
   */
  cardClicked() {
    this.clicked.emit(this.stream.channel.display_name);
  }

}
