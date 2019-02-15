import { Post, PostVisibility } from '../models/Post';
import { inject, bindable } from "aurelia-framework";
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import { post } from 'selenium-webdriver/http';

@inject(ValidationControllerFactory)
export class EditPostModal{
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  visibilityOptions = [PostVisibility.Public, PostVisibility.Private];

  constructor(vcf: ValidationControllerFactory){
    this.vc = vcf.createForCurrentScope();
    this.vcf = vcf;
  }

}
ValidationRules
.ensure("title")
.required()
.minLength(3)
.maxLength(50)
.ensure("body")
.required()
.minLength(20)
.on(EditPostModal);
;
