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

  bool_check : boolean;
  model: string;

  constructor() {
    this.bool_check = true;
    this.model = '';
  }

  ngOnInit(): void {
  }

  functionShowMessage() {
    alert(this.model);
  }

}
