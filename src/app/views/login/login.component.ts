import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Error = false;
  disabled=false;
  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) {
    if (this.authService.isLoggedIn()){
      this.router.navigate(['dashboard']);
    }
    this.init_Form();
  }
  ngOnInit() : void{

  }
  init_Form() {
    this.loginForm = this.fb.group({
      email : ['jessica.brudey@gmail.com', [Validators.required, Validators.email]],
      password: ['webapero', Validators.required]
    });
  }
  onSubmit() {
    this.disabled=true;
    const cred = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(cred).subscribe((res) => {

      this.disabled=false;
    },
    (err:any) => {
      localStorage.setItem('email', cred.email);
      this.Error = true;
      this.disabled=false;
    });
   }

}
