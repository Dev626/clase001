import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CalcService } from '@services/calc.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss']
})
export class ContentViewComponent implements OnInit {

  bool_check: boolean;
  model: string;
  numbers_calc: any[];
  result?: string;
  calcService: CalcService = new CalcService();
  @ViewChild('inputCalc') inputCalc?: ElementRef<HTMLInputElement>;

  constructor() {
    this.bool_check = true;
    this.model = '';
    this.numbers_calc = [
      { value: '-', text: '' },
      { value: '+', text: '' },
      { value: '*', text: '' },
      { value: '/', text: '' },
      { value: '(', text: '' },
      { value: 0, text: 'zero' },
      { value: 1, text: 'one' },
      { value: 2, text: 'two' },
      { value: 3, text: 'three' },
      { value: 4, text: 'four' },
      { value: 5, text: 'five' },
      { value: 6, text: 'six' },
      { value: 7, text: 'seven' },
      { value: 8, text: 'eight' },
      { value: 9, text: 'nine' },
      { value: ')', text: '' },
    ];
  }

  ngOnInit(): void {
  }

  functionCalc() {
    this.result = this.calcService.evalOperation(this.model);
  }

  keyFindBtn(event: any) {
    this.numbers_calc.forEach((element, index, array) => {
      element.class = (element.value == event.key ? 'btn-success' : 'btn-primary');
    })
  }

  functionClearCalc() {
    this.model = '';
    this.result = '';
  }

  clickParent(itemIn?: any) {
    this.model +=
      (isNaN(itemIn.value) ? ' ' : '')
      + itemIn.value
      + (isNaN(itemIn.value) ? ' ' : '');
  }

  PrintViewChild(element: any) {
    console.log('element:', element)
    console.log('this.inputCalc:', this.inputCalc)
    console.log('this.inputCalc:', this.inputCalc?.nativeElement)

    let el = document.getElementById('inputCalc');
    console.log('el:', el)
  }
}
