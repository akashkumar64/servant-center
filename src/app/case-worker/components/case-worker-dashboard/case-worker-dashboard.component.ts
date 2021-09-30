import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-case-worker-dashboard',
  templateUrl: './case-worker-dashboard.component.html',
  styleUrls: ['./case-worker-dashboard.component.scss']
})
export class CaseWorkerDashboardComponent implements OnInit {
  data:any;
  name:any;
  date:any;
  imgSrc='';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'prev,next',
      center:'title',
      end: 'dayGridMonth,timeGridWeek,listWeek'
    },
    nowIndicator: true
  };
  constructor(private service:DataService) { 
    this.service.getName().subscribe(res=>
      {
      
       this.data= res;
       console.log(this.data)
     this.name= this.data.name;
    this.date=this.data.lastLogin;
    this.imgSrc= this.data.imgSrc;
      })

  }

  ngOnInit(): void {
  }

}