import { EventAggregator } from 'aurelia-event-aggregator';
import { CheckRegister } from './../authChecks/checkRegister';
import { AccountRepository } from './../repository/AccountRepository';
import { ValidationRules, ValidationController, ValidationControllerFactory } from 'aurelia-validation';
import { AccountType, Account } from './../models/Account';
import { inject } from 'aurelia-framework';
import * as $ from 'jquery';

@inject(ValidationControllerFactory, AccountRepository, CheckRegister, EventAggregator)
export class EditAccountModal {
  accountId: number;
  username: string;
  password: string;
  editableAccount: Account;
  accountType: AccountType = AccountType.User;
  accountTypes = [AccountType.User, AccountType.Admin];
  vc: ValidationController;
  vcf: ValidationControllerFactory;
  ar: AccountRepository;
  cr: CheckRegister;
  error: string;
  ea: EventAggregator;

  constructor(vcf: ValidationControllerFactory, ar: AccountRepository, cr: CheckRegister, ea: EventAggregator) {
    this.vc = vcf.createForCurrentScope();
    this.ar = ar;
    this.cr = cr;
    this.ea = ea;
  }
  attached() {
    this.ea.subscribe("editAccount", acc => {
      this.username = acc.username;
      this.password = acc.password;
      this.accountType = acc.accountType;
      this.accountId = acc.accountId;
      this.editableAccount = acc;
    });
  }

  editAccount() {
    this.error = "";
    try {
      if (this.editableAccount.username == this.username) {
        this.ar.editAccount(this.accountId, this.username, this.password, this.accountType);
        $('#close-edit').click();
      } else if (this.editableAccount.username != this.username && this.cr.isUsernameAvailable(this.username)) {
        this.ar.editAccount(this.accountId, this.username, this.password, this.accountType);
        $('#close-edit').click();
      }
    } catch (err) {
      this.error = err;
    }
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
  .on(EditAccountModal);
