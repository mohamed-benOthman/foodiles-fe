import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup;
  Error=false;
  constructor(private authService:AuthService, private fb:FormBuilder){
  this.init_Form();
  }

  init_Form(){
    this.loginForm =this.fb.group({
      email :['jessica.brudey@gmail.com',[Validators.required,Validators.email]],
      password:['webapero',Validators.required]
    })
  }
  onSubmit(){
    const cred ={
      email: this.loginForm.value.email,
      pass:this.loginForm.value.password
    }
    this.authService.login(cred).subscribe((res)=>{

    },
    err=>{
      this.Error=true
    });
   }

}
