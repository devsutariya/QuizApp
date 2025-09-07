import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Test } from '../../services/test';
// import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-view-my-test-results',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-my-test-results.html',
  styleUrl: './view-my-test-results.scss'
})
export class ViewMyTestResults {

  dataSet:any;
  
  constructor(private testService:Test,
    private cd: ChangeDetectorRef
  ){}


  ngOnInit(){
   this.getTestResults();
  }

  getTestResults(){
    this.testService.getMyTestResult().subscribe(res => {
      this.dataSet = [...res];
      console.log(this.dataSet);
      this.cd.detectChanges();
    })
}
}