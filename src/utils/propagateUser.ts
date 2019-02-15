import { Account } from './../models/Account';
import { App } from './../app';
import { inject } from 'aurelia-framework';

@inject(App)
export class PropagateUser{
  app: App;

  constructor(app: App){
    this.app = app;
  }

  getCurrentUser(): Account{
    return this.app.currentUser;
  }

}
