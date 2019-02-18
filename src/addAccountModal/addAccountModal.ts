import { AccountRepository } from './../repository/AccountRepository';
import { ValidationRules, ValidationController, ValidationControllerFactory } from 'aurelia-validation';
import { AccountType } from './../models/Account';
import { inject } from 'aurelia-framework';

@inject(ValidationControllerFactory, AccountRepository)
export class AddAccountModal{
  username:string;
  password: string;
  accountTypes = [AccountType.User, AccountType.Admin];
  accountType: AccountType = AccountType.User;
  vc: ValidationController;
  vcf: ValidationControllerFactory;
  ar: AccountRepository;
  err = "";

  constructor(vcf: ValidationControllerFactory, ar: AccountRepository){
    this.vc = vcf.createForCurrentScope();
    this.ar = ar;
  }

  addAccount(){
      let res = this.ar.addAccount(this.username, this.password, this.accountType);
    }
}
ValidationRules
  .ensure("username")
  .required()
  .minLength(5)
  .maxLength(20)
  .ensure("password")
  .required()
  .minLength(8)
  .on(AddAccountModal);
