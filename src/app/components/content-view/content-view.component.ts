import {
  Component,
  OnInit,
} from '@angular/core';

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
    this.result = eval(this.model);
  }

  functionClearCalc() {
    this.model = '';
    this.result = '';
  }

  keyFindBtn(event: any) {
    this.numbers_calc.forEach((element, index, array) => {
      element.class = (element.value == event.key ? 'btn-success' : 'btn-primary');
    })
  }

  clickParent(itemIn?: any) {
    this.model +=
      (isNaN(itemIn.value) ? ' ' : '')
      + itemIn.value
      + (isNaN(itemIn.value) ? ' ' : '');
  }
}
