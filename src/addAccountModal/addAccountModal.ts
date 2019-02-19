<<<<<<< HEAD
=======
import { CheckRegister } from './../authChecks/checkRegister';
>>>>>>> d8401ae
import { AccountRepository } from './../repository/AccountRepository';
import { ValidationRules, ValidationController, ValidationControllerFactory } from 'aurelia-validation';
import { AccountType } from './../models/Account';
import { inject } from 'aurelia-framework';
<<<<<<< HEAD

@inject(ValidationControllerFactory, AccountRepository)
=======
import * as $ from 'jquery';

@inject(ValidationControllerFactory, AccountRepository, CheckRegister)
>>>>>>> d8401ae
export class AddAccountModal{
  username:string;
  password: string;
  accountTypes = [AccountType.User, AccountType.Admin];
  accountType: AccountType = AccountType.User;
  vc: ValidationController;
  vcf: ValidationControllerFactory;
  ar: AccountRepository;
<<<<<<< HEAD
  err = "";

  constructor(vcf: ValidationControllerFactory, ar: AccountRepository){
    this.vc = vcf.createForCurrentScope();
    this.ar = ar;
  }

  addAccount(){
      let res = this.ar.addAccount(this.username, this.password, this.accountType);
      if(res){
        this.err = res;
      }
    }
=======
  cr: CheckRegister;
  error = "";

  constructor(vcf: ValidationControllerFactory, ar: AccountRepository, cr: CheckRegister){
    this.vc = vcf.createForCurrentScope();
    this.ar = ar;
    this.cr = cr;
  }

  addAccount(){
    this.error = "";
    try {
      if (this.cr.isUsernameAvailable(this.username))
        this.ar.addAccount(this.username, this.password, AccountType.User);
        $('#close-btn').click(); 
    } catch (err) {
      this.error = err;
    }
  }

>>>>>>> d8401ae
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
