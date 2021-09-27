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
    this.menu = [{
      "list_items": [{
        "name": "Dashboard",
        "icon": "fas fa-fw fa-tachometer-alt",
        "link": "index.html",
        "default": true
      }]
    }, {
      "header": "Interface",
      "list_items": [{
        "name": "Components",
        "icon": "fas fa-fw fa-cog",
        "link": "#",
        "default": false
      }, {
        "name": "Utilities",
        "icon": "fas fa-fw fa-wrench",
        "link": "#",
        "default": false
      }]
    }, {
      "header": "Addons",
      "list_items": [{
        "name": "Pages",
        "icon": "fas fa-fw fa-folder",
        "link": "#",
        "default": false
      }, {
        "name": "Charts",
        "icon": "fas fa-fw fa-chart-area",
        "link": "#",
        "default": false
      }, {
        "name": "Tables",
        "icon": "fas fa-fw fa-table",
        "link": "#",
        "default": false
      }]
    }];
  }

  ngOnInit(): void {
  }

}
