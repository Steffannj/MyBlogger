import { AccountType } from './../models/Account';
import { CheckLogin } from './../authChecks/checkLogin';
import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

@inject(CheckLogin, EventAggregator, Router)
export class Login {    
  username: string;
  password: string;
  error: string;
  checkLogin: CheckLogin;
  ea: EventAggregator;
  router: Router;

  constructor(checkLogin: CheckLogin, ea: EventAggregator, router: Router) {
    this.checkLogin = checkLogin;
    this.ea = ea;
    this.router = router;
  }

  login(){
    try{
      let account = this.checkLogin.tryLogin(this.username, this.password);
      if(account.accountType == AccountType.User){
        this.ea.publish("account", account);
        this.router.navigateToRoute("userprofile");
      }else{
        this.ea.publish("account", account);
        this.router.navigateToRoute("adminpage")
      }
    }
    catch(err){
      this.error = err;
    }
  }

}

