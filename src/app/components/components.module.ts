import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdsComponent } from './ads/ads.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { GoHomeComponent } from './go-home/go-home.component';
import { GoTopComponent } from './go-top/go-top.component';
import { InLineComponent } from './in-line/in-line.component';
import { MenuOptionsComponent } from './menu-options/menu-options.component';
import { MyComponent } from './my-component/my-component.component';
import { NotifyItemsComponent } from './notify-items/notify-items.component';
import { SecondComponent } from './second/second.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ThirdComponent } from './third/third.component';
import { TopbarComponent } from './topbar/topbar.component';
import { UserActionsComponent } from './user-actions/user-actions.component';

@NgModule({
  imports: [
    // librerias adicionales (Material, NgBootstrap, )
    FormsModule
  ],
  declarations: [
    MyComponent,
    SecondComponent,
    ThirdComponent,
    InLineComponent,
    SidebarComponent,
    TopbarComponent,
    NotifyItemsComponent,
    UserActionsComponent,
    MenuOptionsComponent,
    DropdownItemComponent,
    ContentViewComponent,
    AdsComponent,
    GoHomeComponent,
    GoTopComponent
  ],
  exports: [
    MyComponent,
    SecondComponent,
    ThirdComponent,
    InLineComponent,
    SidebarComponent,
    TopbarComponent,
    NotifyItemsComponent,
    UserActionsComponent,
    MenuOptionsComponent,
    DropdownItemComponent,
    ContentViewComponent,
    AdsComponent,
    GoHomeComponent,
    GoTopComponent
  ]
})

export class ComponentsModule { }