import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
constructor(private fb: FormBuilder,
  private message: NzMessageService,
  private router: Router,
  private auth: Auth,
) {}

validateForm!:FormGroup;

ngOnInit() {
  this.validateForm = this.fb.group({
    email: [null,[Validators.required,Validators.email]],
    password: [null,[Validators.required]],
    name: [null,[Validators.required]],
  })
}
submitForm(){
  this.auth.register(this.validateForm.value).subscribe(res=>{
    this.message.success(`Registration Successful`,{nzDuration:5000});
    this.router.navigateByUrl("/login");
  },error=>{
    this.message.error(`${error.error}`,{nzDuration:5000})
  } )
}
// Inside the Signup class in signup.ts

// goToSignup() {
//     this.router.navigateByUrl('/register');
//   }
}
