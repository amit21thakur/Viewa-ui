import { Component } from '@angular/core';
import {EventModel} from '../../models/event.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  rangeFormGroup:FormGroup;

  dataSource: EventModel[];

  constructor(private eventService:EventService){

  }

  ngOnInit(){
    
    this.rangeFormGroup = new FormGroup({  
      start: new FormControl(null, Validators.required),  
      end: new FormControl(null, Validators.required)  
    });

   
  }

  applyFilter(){
    this.eventService.getEvents(this.rangeFormGroup.value, null, null, null)
    .subscribe(events=>{
      this.dataSource = events;
    },
    error => {
      console.log(error);
    });
  }

}
  
