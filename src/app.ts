import { Account } from './models/Account';
import { PLATFORM } from 'aurelia-pal';
import {  RouterConfiguration, Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator, Router)
export class App {
  ea: EventAggregator;
  router: Router;
  currentUser: Account;

  constructor(ea: EventAggregator, router: Router) {
    this.ea = ea;
    this.router = router;
    this.ea.subscribe("account", acc => this.currentUser = acc);
  }

   configureRouter(config: RouterConfiguration) {
    config.title = 'MyBlogger';
    config.options.pushState = true;
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: PLATFORM.moduleName('loginAndRegister/login'), title: 'Log In' },
      { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('loginAndRegister/signup'), title: 'Sign Up' },
      { route: 'userprofile', name: 'userprofile', moduleId: PLATFORM.moduleName('userProfile/userprofile'), title: 'Your Profile' },
      { route: 'adminpage', name: 'adminpage', moduleId: PLATFORM.moduleName('admin/adminPage'), title: 'Your Profile' },
      { route: 'home', name: 'home', moduleId: PLATFORM.moduleName('home/home'), title: 'Home' }
    ]);
  }

}

