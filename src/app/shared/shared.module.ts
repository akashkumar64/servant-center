import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from "primeng/divider";
import { MenuModule } from 'primeng/menu';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin  from "@fullcalendar/interaction";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemHeaderComponent } from './components/item-header/item-header.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from "primeng/tabview";
import { StepsModule } from 'primeng/steps'
import { CardModule } from "primeng/card";
import { TabMenuModule } from "primeng/tabmenu";
import {InputTextareaModule} from 'primeng/inputtextarea';
import { RadioButtonModule } from "primeng/radiobutton";
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from "primeng/inputswitch";
import { ToolbarModule } from "primeng/toolbar";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { KeysPipe } from '../case-worker/components/resident-search/rs-initial-assessment/ia-form-page-three/ia-form-page-three.component';
import { ConsentDataComponent } from './components/consent-data/consent-data.component';
import {DialogModule} from 'primeng/dialog';
import {HttpClientModule} from '@angular/common/http'


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  listPlugin,
  timeGridPlugin,
  interactionPlugin
]);
const MODULES = [
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DividerModule,
    MenuModule,
    DropdownModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TabViewModule,
    TabMenuModule,
    StepsModule,
    CardModule,
    InputTextareaModule,
    RadioButtonModule,
    CheckboxModule,
    InputSwitchModule,
    ToolbarModule,
    ToggleButtonModule,
    DialogModule,
    HttpClientModule
];

const COMPONENTS = [
  ItemHeaderComponent,
  HeaderComponent,
  FooterComponent,
  KeysPipe
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    ConsentDataComponent
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule { }
