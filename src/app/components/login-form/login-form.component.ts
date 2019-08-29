import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private loginService: LoginService,
              private afAuth: AngularFireAuth) { }

  @Input() visabilityValue: boolean;
  @Output() closeLoginForm = new EventEmitter<any>();

  emailAdmin: string;
  passwordAdmin: string;

  ngOnInit() {
    
    
  }


  login(email: string, password: string, form: NgForm) {
    event.preventDefault();
    this.loginService.loginEmailPassword(email, password);
    setTimeout(() => {
      this.resetLoginForm(form);
      this.loginService.getUserState();
    }, 1000);
    
  }

  setAuthState() {
   this.loginService.getUserState();
  
  }

  onCloseLoginForm() {
    this.closeLoginForm.emit();
  }

  resetLoginForm(form: NgForm) {
    form.reset();
  }

}
