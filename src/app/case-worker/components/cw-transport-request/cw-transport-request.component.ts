import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TransportService } from '../../services/transport.service';
import { DatePipe, Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cw-transport-request',
  templateUrl: './cw-transport-request.component.html',
  styleUrls: ['./cw-transport-request.component.scss'],
})
export class CwTransportRequestComponent implements OnInit, OnChanges {
  @Input() requestFormObject: any;
  submitted = false;
  mobileMode = false;
  public minDateValue: any;
  public maxDateValue: any;
  public caseWorker: any;
  public firstName: any;
  public lastName: any;
  public appointmentDate: any
  public time: any;
  public reason: any;
  public address: any;
  public city: any;
  public state!: any[];
  public zip: any;
  public coordinatorField: any;
  public nursingNotifiedField: any;
  public byField: any;
  public dateApproved: any;
  public dateField: any;
  defaultDate: any;
  tableData: any;
  selectedResident: any;
  public optionState: any;
  public newAappointmentDate:any;
  public msgCount: number = 1;
  public msgData: any;
  items!: MenuItem[];

  constructor(
    private formbuilder: FormBuilder,
    private service: TransportService,
    private datePipe: DatePipe,
    private router: Router,
    private location: Location
  ) {
    this.minDateValue = new Date(new Date().getTime());
    this.maxDateValue = new Date(new Date().getTime());
  }
  
  transportRequestForm!: FormGroup;

  @HostListener('window:resize')
  onWindowResize() {
    this.mobileMode = window.innerWidth < 768;
  }


  ngOnInit(): void {
    this.onWindowResize();
    // this.service.getTransportRequestFormData().subscribe((data) => {
    this.caseWorker = this.requestFormObject;
    console.log("data",this.requestFormObject);
    //console.log("CaseWorker",this.caseWorker); 
    this.firstName = this.caseWorker.first_name;
    this.lastName = this.caseWorker.last_name;
    this.appointmentDate = this.caseWorker.appointment_date
    this.time = this.caseWorker.appointment_time;
    this.reason = this.caseWorker.reason_for_request;
    this.coordinatorField = this.caseWorker.transport_coordinator;
    this.nursingNotifiedField = this.caseWorker.nursing_notified;
    this.address = this.caseWorker.pick_up_address_main;
    this.city = this.caseWorker.pick_up_city;
    this.state = this.caseWorker.pick_up_state;
    console.log("State",this.state);

    this.zip = this.caseWorker.pick_up_zip_code;
    this.dateApproved = this.caseWorker.approved_date;
    this.byField = this.caseWorker.notified_by;
    this.dateField = this.caseWorker.date_filled;

    this.buildForm();
    console.log(this.transportRequestForm.value);
    // });
  }

  ngOnChanges(change: SimpleChanges): void {
    console.log('login');
    console.log(change);
    
    
    if (change?.requestFormObject) {
      this.caseWorker = change.requestFormObject.currentValue;
    }
    this.newAappointmentDate=this.datePipe.transform(this.caseWorker.appointment_date,'dd/MM/yyyy')
  }

  buildForm() {
    this.transportRequestForm = this.formbuilder.group({
      firstName: [this.caseWorker.first_name],
      lastName: [this.caseWorker.last_name, Validators.required],
      appointmentDate: [this.newAappointmentDate],
      time: [this.caseWorker.appointment_time, Validators.required],
      reason: [this.caseWorker.reason_for_request, Validators.required],
      address: [this.caseWorker.pick_up_address_main, Validators.required],
      city: [this.caseWorker.pick_up_city, Validators.required],
      state: [this.caseWorker.pick_up_state, Validators.required],
      zip: [this.caseWorker.pick_up_zip_code, Validators.required],
      coordinator: ['', Validators.required],
      approvedDate: [this.maxDateValue, Validators.required],
      nursingNotified: [''],
      by: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  get by() {
    return this.transportRequestForm.get('by');
  }

  get coordinator() {
    return this.transportRequestForm.get('coordinator');
  }
  get nursingNotified() {
    return this.transportRequestForm.get('nursingNotified');
  }

  get approvedDate() {
    return this.transportRequestForm.get('approvedDate');
  }

  get date() {
    return this.transportRequestForm.get('date');
  }

  
  onSubmit() :void {

let obj={

  request_id:this.caseWorker.request_id,

  coordinator:this.transportRequestForm.value.coordinator,

  nursing_notified:this.transportRequestForm.value.nursingNotified,

  notified_by:this.transportRequestForm.value.by,

  approved_date:this.transportRequestForm.value.approvedDate,

  date:this.transportRequestForm.value.date
};
	this.service.approveTransportationForm(obj).subscribe((data)=>{
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      console.log("Path Refresg",decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
     }); 
    this.submitted = true;
	  console.log("Form submitted");
   });

    console.log(this.transportRequestForm.value);
	  this.transportRequestForm.reset();
    // }
  }

  reset() {
    this.buildForm();
    this.submitted = false;
  }
  tableValues: any;
  selectResident(index: number) {
    this.service.getTransportRequestFormData().subscribe((data) => {
      this.tableValues = data;
    });
    this.selectedResident = this.caseWorker[index];
  }
}