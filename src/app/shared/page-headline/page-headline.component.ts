import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-headline',
  templateUrl: './page-headline.component.html',
  styleUrls: ['./page-headline.component.css']
})
export class PageHeadlineComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() buttonText: string;
  @Input() visibility: boolean;
  @Output() buttonClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitEvent () {
    this.buttonClick.emit();
  }

}
