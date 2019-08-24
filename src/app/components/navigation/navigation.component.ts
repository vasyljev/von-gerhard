import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, DoCheck, OnChanges {

  navVisability: boolean = true;
  menuVisabilityValue: boolean = false;
  menuButtonVisabilityValue: boolean = true;
  loginState: boolean;
  loginFormVisability: boolean = true;
  loginImage: string = 'assets/images/login-image.svg';
  logoutImage: string = 'assets/images/logout-image.svg';
  buttonImage: string;
  basketCount: number;

  constructor(private loginService: LoginService,
    public localStorageService: LocalStorageService) { }
  
  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngDoCheck() {
    // console.log('ngDoCheck');
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
      //  if (lastScrollValue < window.pageYOffset) {
        this.navVisability = false;
      }       
      lastScrollValue = window.pageYOffset;
    }
  }

  getLoginState() {
    this.loginState = this.localStorageService.getLoginStatus();
    this.loginService.getUserState();
    console.log('getLoginState loginState localStor navComp', this.loginState);
  }

  loginOrSignOut() {
    let loginStatus = this.localStorageService.getLoginStatus();
    console.log('loginOrSignOut loginStatus navComp', loginStatus);
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
    this.menuVisabilityValue = !this.menuVisabilityValue;
  }
  

}
