import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Admin } from '../../services/admin';

@Component({
  selector: 'app-view-test-results',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-test-results.html',
  styleUrl: './view-test-results.scss'
})
export class ViewTestResults {

  resultData:any;
  constructor(private testService:Admin,
      private cd: ChangeDetectorRef

  ){}

  ngOnInit(){
    this.getTestResults();
  }

  getTestResults(){
    this.testService.getTestResults().subscribe(res => {
      this.resultData = [...res];
      console.log(this.resultData);
      this.cd.detectChanges();
    })
}
}
