import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { progressNoteResponse } from 'src/app/shared/models/progressNotes_model';

import { ProgressNotesService } from 'src/app/veteran/services/progress-notes.service';

@Component({
  selector: 'app-progress-notes',
  templateUrl: './progress-notes.component.html',
  styleUrls: ['./progress-notes.component.scss'],
})
export class ProgressNotesComponent implements OnInit {
  public title = 'PROGRESS NOTES';
  public display = false;
  public displayList = false;
  public status: any;
  public searchText = '';
  public progressNote: any;
  public d: any;
  public progressNotes: any = [];
  public progress: any = [];
  public initialStatus = false;
  public progressNotesState:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: ProgressNotesService
  ) {}

  ngOnInit(): void {
    //get data from backend

    this.service.getNotes().subscribe((data:progressNoteResponse) => {
      this.progress = data;
      let k = 0;
      for (let i = this.progress.length; i > 0; i--) {
        this.progressNotes[k++] = this.progress[i - 1];
      }
    });

    this.initialStatus = false;
    this.buildForm();
  }
  
  
  expandOrCollapse(index: any) {
    const elementSelector = '#goal-desc--' + index;
    const descElement = document.querySelector(elementSelector) as HTMLElement;
    descElement.classList.contains('expand')
      ? descElement.classList.remove('expand')
      : descElement.classList.add('expand');
  }

  showDialog() {
    this.display = true;
    this.buildForm();
  }

  showList() {
    this.displayList = true;
  }

  buildForm() {
    let d =
      new Date().getMonth() +
      1 +
      '/' +
      new Date().getUTCDate() +
      '/' +
      new Date().getFullYear();
    this.progressNote = this.formBuilder.group({
      goalTitle: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(.)*'),
          Validators.maxLength(50),
        ],
      ],
      goalDescription: ['', [Validators.required, Validators.maxLength(300)]],
      goalState: [false, Validators.required],
      addedDate: [d]
    });
  }

  get progressNoteForm() {
    return this.progressNote.controls;
  }
  onSubmit() {
    let d =
    new Date().getMonth() +
    1 +
    '/' +
    new Date().getUTCDate() +
    '/' +
    new Date().getFullYear();
    console.log(this.progressNote.value);
    //send data to backend
     this.service.postNotes(this.progressNote.value).subscribe((data) => {
       console.log('Submitted');
     });
    //get data from backend
    this.service.getNotes().subscribe((notes:progressNoteResponse) => {
      console.log(notes);
    });
     this.progressNotes.push(this.progressNote.value);
    
    this.display = false;
    this.progressNote.reset();
  }
  crossButton() {
    this.initialStatus = true;
    this.progressNote.reset();
  }
  changed(goal_id:number, goal_status: boolean){
    //TO UPDATE STATUS OF PROGRESS NOTE 
    this.progressNotesState = {
      goal_id,
      goal_status
    };
    console.log("status changed for id and status",goal_id, goal_status); 

    this.service.postStatus(this.progressNotesState).subscribe((data) => {
    console.log('proressnote value after status change',  this.progressNotesState);
  });
    
  }
  cancleIt() {
    this.display = false;
    this.initialStatus = true;
    this.progressNote.reset();
  }
}
