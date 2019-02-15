import { PostRepository } from './../repository/PostRepository';
import { Post, PostVisibility } from '../models/Post';
import { inject, bindable } from "aurelia-framework";
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';

@inject(ValidationControllerFactory, PostRepository)
export class EditPostModal{
  title: string;
  body: string;
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  visibilityOptions = [PostVisibility.Public, PostVisibility.Private];
  pr: PostRepository;

  constructor(vcf: ValidationControllerFactory, pr: PostRepository){
    this.vc = vcf.createForCurrentScope();
    this.vcf = vcf;
    this.pr = pr;
  }

  editPost(post: Post){
    this.pr.changePost(post);
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
