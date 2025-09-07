import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Admin } from '../../services/admin';

@Component({
  selector: 'app-add-question-in-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-question-in-test.html',
  styleUrl: './add-question-in-test.scss'
})
export class AddQuestionInTest {
  constructor(private fb: FormBuilder,
    private adminService: Admin,
    private notification: NzNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  id: number | null;
  questionForm!: FormGroup;

  ngOnInit(){
    this.questionForm = this.fb.group({
      questionText: [null, [Validators.required]],
      optionA: [null, [Validators.required]],
      optionB: [null, [Validators.required]],
      optionC: [null, [Validators.required]],
      optionD: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    });

    this.id = this.activatedRoute.snapshot.params["id"];
  }

  submitForm(){
    const questionDto =this.questionForm.value;
    questionDto.id=this.id;
    this.adminService.addQuestionInTest(questionDto).subscribe(res=>{
      this.notification.success('Success', `Question added successfully`,{nzDuration:5000});
      this.router.navigateByUrl('/admin/dashboard');
    },error=>{
      this.notification.error('Error', `${error.error}`,{nzDuration:5000});
    })
  }
}
