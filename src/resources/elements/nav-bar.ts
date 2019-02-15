import { Account, AccountType } from './../../models/Account';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(EventAggregator, Router)
export class NavBar {
  currentUser: Account;
  ea: EventAggregator;
  router: Router;

  constructor(ea: EventAggregator, router: Router) {
    this.ea = ea;
    this.router = router;
    this.ea.subscribe("account", account => {
      this.currentUser = account;
    });
  }

  logout() {
    this.ea.publish("account", null);
    this.router.navigateToRoute("login");
  }
}
