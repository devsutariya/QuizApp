import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Admin } from '../../services/admin';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  tests = [];
  items$!: Observable<any[]>;
  constructor(private notification: NzNotificationService,
    private testService: Admin,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(){
    this.testService.getAllTest().subscribe(res=>{
      this.tests = [...res];
    },error=>{
      this.notification.error('ERROR', `Something went wrong!`,{nzDuration:5000})
    })
    this.items$ = this.testService.getAllTest();
    this.cd.detectChanges();
}

getFormattedTime(time): string{
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  return `${minutes} minutes ${seconds} seconds`;
}
}