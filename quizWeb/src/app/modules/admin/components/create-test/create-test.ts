import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../../services/admin';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-test.html',
  styleUrl: './create-test.scss'
})
export class CreateTest {
  constructor(private fb: FormBuilder,
    private devicesService: Admin,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  testForm!: FormGroup;

  ngOnInit() {
    this.testForm = this.fb.group({
      title: [null,Validators.required],
      description: [null,[Validators.required]],
      time: [null,[Validators.required]],
      })
  }

  submitForm() {
    if (this.testForm.valid) {
    this.devicesService.createTest(this.testForm.value).subscribe(res => {
      this.notification.success('Success', 'Test created successfully', { nzDuration: 5000 });
      this.router.navigateByUrl('/admin/dashboard');
    }, error => {
      this.notification.error('Error', `${error.error}`, { nzDuration: 5000 });
    })
  }
  }
}