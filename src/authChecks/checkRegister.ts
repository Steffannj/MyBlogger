import { AccountRepository } from './../repository/AccountRepository';
import { inject } from "aurelia-framework";

@inject(AccountRepository)
export class CheckRegister {
  ar: AccountRepository;

  constructor(ar: AccountRepository) {
    this.ar = ar;
  }

  isUsernameAvailable(username: string): boolean {
    let account = this.ar.accounts.find(acc => acc.username == username);
    if (account) {
      throw "Username taken"
    } else {
      return true;
    }
  }

}
