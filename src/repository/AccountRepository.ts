import { Account, AccountType } from './../models/Account';

export class AccountRepository{
    accounts: Array<Account> = [
    new Account("admin", "admin", AccountType.Admin),
    new Account("korisnik", "korisnik", AccountType.User)
    ];
 
    constructor(){
      
    }

    addAccount(username, password, accountType){
      this.accounts.push(new Account(username, password, accountType));
    }

    getAccount(username): Account{
      let acc;
      this.accounts.forEach((account) => {
        if(account.username == username){
          acc = account;
        }
      });
      return acc;
    }

    getAllAccounts(){
      return this.accounts;
    }

    deleteAccount(accountId: number){
      this.accounts.forEach((account, index) => {
        if(account.accountId === accountId){
          this.accounts.splice(index, 1);
        }
      });
    }

    editAccount(accountId: number, username: string, password: string, accountType: AccountType){
      let index = this.accounts.findIndex(account => account.accountId == accountId);
      this.accounts[index].username = username;
      this.accounts[index].password = password;
      this.accounts[index].accountType = accountType;
    }
}

