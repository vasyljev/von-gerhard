import { Component, OnInit, DoCheck } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, DoCheck {

  navVisability: boolean = true;
  menuVisabilityValue: boolean = false;
  menuButtonVisabilityValue: boolean = true;
  private loginState: boolean = false;
  loginFormVisability: boolean = true;
  loginImage: string = 'assets/images/login-image.svg';
  logoutImage: string = 'assets/images/logout-image.svg';
  buttonImage: string;
  basketCount: number;

  constructor(private loginService: LoginService,
    public localStorageService: LocalStorageService) { }
  
  ngDoCheck() {
    this.loginState = this.localStorageService.getLoginStatus();
    if(this.loginState) {
      this.loginFormVisability = true;
    }
    this.buttonImage = `url(${this.loginState ? this.logoutImage : this.loginImage})`;
    this.basketCount = this.localStorageService.getBasketCount();
  } 

  ngOnInit() {
    this.hideShowNav();
    this.loginState = this.localStorageService.getLoginStatus();
    this.getLoginState();

  }  

  hideShowNav() {
    let lastScrollValue = 0;
    window.onscroll = () => {
      if(window.pageYOffset <= 0 || lastScrollValue > window.pageYOffset) {
        this.navVisability = true;
      } else {
        this.navVisability = false;
      }       
      lastScrollValue = window.pageYOffset;
    }
  }

  getLoginState() {
    this.loginState = this.localStorageService.getLoginStatus();
    return  this.loginState;
  }

  loginOrSignOut() {
    let loginStatus = this.localStorageService.getLoginStatus();
    if(loginStatus) {
      this.loginFormVisability = true;
      this.loginService.signOut();
      this.localStorageService.logOut();
    } else {
      this.loginFormVisability = false;
    }
    
  }

  signOut() {
    this.loginService.signOut();
  }

  closeLoginForm() {
    this.loginFormVisability = true;
  }

  showHideMenu() {
   let burgerCheckbox = document.getElementById('burger-checkbox') as HTMLInputElement;
    this.menuVisabilityValue = !this.menuVisabilityValue;
    if(!this.menuVisabilityValue) {
      burgerCheckbox.checked = false;
    }
    console.log('this.menuVisabilityValue', this.menuVisabilityValue);
    this.menuCloseButoonAnimation(this.menuVisabilityValue);
  }
  
  menuCloseButoonAnimation(menuVisabilityValue: boolean) {
    let buttonFirstLine = document.getElementById('first-close-line');
    let buttonSecondLine = document.getElementById('second-close-line');
    if(menuVisabilityValue) {
      buttonFirstLine.classList.add('fade-in-first-close-line');
      buttonSecondLine.classList.add('fade-in-second-close-line');
    } else {
      buttonFirstLine.classList.remove('fade-in-first-close-line');
      buttonSecondLine.classList.remove('fade-in-second-close-line');
    }
  }

}
