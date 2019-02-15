import { Account } from './../models/Account';
import { AccountRepository } from './../repository/AccountRepository';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";

@inject(Router, EventAggregator, AccountRepository)
export class AdminPage {
  currentUser: Account;
  ea: EventAggregator;
  router: Router;
  accountRepository: AccountRepository;
  listOfAccounts: Array<Account>;

  constructor(router: Router, ea: EventAggregator, au: AccountRepository) {
    this.ea = ea;
    this.router = router;
    this.accountRepository = au;
    this.ea.subscribe("account", acc => {
      this.currentUser = acc;
    });
  }

  attached() {
    if (!this.currentUser) {
      this.router.navigateToRoute("login");
    }
    this.listOfAccounts = this.accountRepository.getAllAccounts();
  }

  deleteAccount(accountId: number){
    this.accountRepository.deleteAccount(accountId);
  }
}
