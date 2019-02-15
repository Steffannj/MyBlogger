import { Post } from './../models/Post';
import { inject } from "aurelia-framework";
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';

@inject(ValidationControllerFactory)
export class EditPostModal{
  title: string;
  body: string;
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  post: Post;

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
