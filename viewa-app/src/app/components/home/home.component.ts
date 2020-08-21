import { Component } from '@angular/core';
import {EventModel, Chart} from '../../models/event.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import { ChartType, ChartOptions,  ChartDataSets } from 'chart.js';
import { SingleDataSet, Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent {
  rangeFormGroup:FormGroup;

  isUserLoggedIn:boolean;

  selectedEventType:string = "";
  selectedGender:string="";
  
  dataSource: EventModel[];
  charts: Chart[];

  constructor(private eventService:EventService, private loginService:LoginService){
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(){
    
    this.rangeFormGroup = new FormGroup({  
      start: new FormControl(null, Validators.required),  
      end: new FormControl(null, Validators.required)  
    });

    this.isUserLoggedIn = this.loginService.loggedIn;
    this.loginService.loggedInChanged
    .subscribe( (loggedIn)=>{
      this.isUserLoggedIn = loggedIn;
    });
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartPlugins = [];

  public genderChartOptions: ChartOptions = {
    responsive: true,
  };
  public genderChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public genderChartData: SingleDataSet = [300, 500, 100];
  public genderChartPlugins = [];


  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  updateEventType(newEventType:string){
    this.selectedEventType = newEventType;
  }

  updateGender(newGender:string){
    this.selectedGender = newGender;
  }

  applyFilter(){
    this.eventService.getEvents(this.rangeFormGroup.value, this.selectedEventType, this.selectedGender, null)
    .subscribe(result=>{
      this.dataSource = result.data;
      this.charts = result.charts;
      this.pieChartLabels = this.charts[0].names;
      this.pieChartData = this.charts[0].values;

      this.genderChartLabels = this.charts[1].names;
      this.genderChartData = this.charts[1].values;

      this.lineChartLabels = this.charts[2].names;
      
      this.lineChartData = [
        { data: this.charts[2].values, label: "Events" },
      ];
    },
    error => {
      console.log(error);
    });
  }

}
  
