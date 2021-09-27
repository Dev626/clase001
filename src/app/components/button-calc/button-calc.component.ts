import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'button-calc',
  templateUrl: './button-calc.component.html',
  styleUrls: ['./button-calc.component.scss']
})
export class ButtonCalcComponent implements OnInit {


  @Input() itemIn: any; // Property binding []
  // @Input() textButton: string; // Property binding []
  @Output() cuandoElCursorDaClick: EventEmitter<any>; // Event binding ()

  constructor() {
    // this.textButton = '';
    this.cuandoElCursorDaClick = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  clickOnButton(event: any) {
    console.log('event:', event)
    console.log('this.itemIn:', this.itemIn)
    this.itemIn.clicked = true;
    this.cuandoElCursorDaClick.emit(this.itemIn);
  }

}
