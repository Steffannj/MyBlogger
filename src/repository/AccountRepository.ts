import { CheckRegister } from './../authChecks/checkRegister';
import { Account, AccountType } from './../models/Account';
import { inject } from 'aurelia-framework';

@inject(CheckRegister)
export class AccountRepository {
  accounts: Array<Account> = [
    new Account("admin", "admin", AccountType.Admin),
    new Account("korisnik", "korisnik", AccountType.User)
  ];
  cr: CheckRegister;

  constructor(cr: CheckRegister) {
    this.cr = cr;
  } 

  addAccount(username, password, accountType) {
    if(!this.cr.isUsernameAvailable(username))
      this.accounts.push(new Account(username, password, accountType));
  }

  getAccount(username): Account {
    let acc;
    this.accounts.forEach((account) => {
      if (account.username == username) {
        acc = account;
      }
    });
    return acc;
  }

  getAllAccounts() {
    return this.accounts;
  }

  deleteAccount(accountId: number) {
    this.accounts.forEach((account, index) => {
      if (account.accountId === accountId) {
        this.accounts.splice(index, 1);
      }
    });
  }

}

