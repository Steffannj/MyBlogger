import { Account } from './../models/Account';
import { AccountRepository } from './../repository/AccountRepository';
import { inject } from 'aurelia-framework';

@inject(AccountRepository)
export class CheckLogin {
  ar: AccountRepository;

  constructor(ar: AccountRepository) {
    this.ar = ar;
  }

  tryLogin(username: string, password: string): Account {
    let account = this.authenticate(username, password);
    return account;
  }

  private authenticate(username, password): Account {
    let account = this.getAccountIfExists(username, password);
    if (account) {
      return account;
    }
  }

  private getAccountIfExists(username, password): Account {
    let account = this.ar.accounts.find(acc => acc.username == username && acc.password == password);
    if (account) {
      return account;
    } else {
      throw "Invalid credentials";
    }
  }

}
