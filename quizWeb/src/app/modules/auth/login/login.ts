import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorage } from '../services/user-storage';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(private fb:FormBuilder,
    private auth:Auth,
    private router:Router,
    private message: NzMessageService,
  ) { }

  validateForm!: FormGroup;

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null,Validators.required],
      password: [null,Validators.required]
    });
  }
  
  submitForm(){
    this.auth.login(this.validateForm.value).subscribe(res=>{
      this.message.success(`Login Successful`,{nzDuration:5000});
      const user = {
        id: res.id,
        role: res.role,
      }
      UserStorage.saveUser(user);
      if(UserStorage.isAdminLoggedIn()){
        this.router.navigateByUrl('admin/dashboard');
      }else if(UserStorage.isUserLoggedIn()){
         this.router.navigateByUrl('user/dashboard'); 
      }
      console.log(res);
    },error=>{
      this.message.error(`Bad credentials`,{nzDuration:5000});
    } )
  }
}
