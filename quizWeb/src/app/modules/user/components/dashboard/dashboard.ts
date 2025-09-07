import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Test } from '../../services/test';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  tests: any;
  items$!: Observable<any[]>;
  router: any;
  constructor(private notification: NzNotificationService,
    private testService: Test,
    private cd: ChangeDetectorRef

  ) { }

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

startTest(testId: number) {
  // Request fullscreen
  const elem = document.documentElement as any;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }

  // Navigate to take-test page
  this.router.navigate(['/user/take-test', testId]);
}
}
