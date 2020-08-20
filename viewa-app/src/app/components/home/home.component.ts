import { Component } from '@angular/core';
import {EventModel, Chart} from '../../models/event.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  rangeFormGroup:FormGroup;

  dataSource: EventModel[];
  charts: Chart[];

  constructor(private eventService:EventService){
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(){
    
    this.rangeFormGroup = new FormGroup({  
      start: new FormControl(null, Validators.required),  
      end: new FormControl(null, Validators.required)  
    });
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  applyFilter(){
    this.eventService.getEvents(this.rangeFormGroup.value, null, null, null)
    .subscribe(result=>{
      this.dataSource = result.data;
      this.charts = result.charts;
      this.pieChartLabels = this.charts[0].names;
      this.pieChartData = this.charts[0].values;
    },
    error => {
      console.log(error);
    });
  }

}
  
