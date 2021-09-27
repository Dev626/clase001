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

  constructor() {
    this.bool_check = true;
    this.model = '';
    this.numbers_calc = [
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
    ];
  }

  ngOnInit(): void {
  }

  functionShowMessage() {
    alert(this.model);
  }

  clickParent(itemIn: any, item: any) {
    console.log('itemIn:', itemIn)
    console.log('item:', item)
    console.log('this.numbers_calc:', this.numbers_calc)
    // this.numbers_calc[idx] = itemIn
    // alert(item.text);
  }
}
