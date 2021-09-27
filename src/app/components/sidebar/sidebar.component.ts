import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: Array<any>

  constructor() {
    this.menu = [
      {
        "list_items": [{
          "name": "Dashboard",
          "icon": ""
        }]
      }, {
        "header": "Interface",
        "list_items": [{
          "name": "Components"
        }, {
          "name": "Utilities"
        }]
      }, {
        "header": "Addons",
        "list_items": [{
          "name": "Pages"
        }, {
          "name": "Charts"
        }, {
          "name": "Tables"
        }]
      }
    ];
  }

  ngOnInit(): void {
  }

}
