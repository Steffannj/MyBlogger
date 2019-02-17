import { PostVisibility } from './../models/Post';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostRepository } from './../repository/PostRepository';
import { inject } from "aurelia-framework";
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';

@inject(ValidationControllerFactory, PostRepository, EventAggregator)
export class EditPostModal{
  title: string;
  body: string;
  visibility: PostVisibility = PostVisibility.Private;
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  visibilityOptions = [PostVisibility.Public, PostVisibility.Private];
  pr: PostRepository;
  ea: EventAggregator;

  constructor(vcf: ValidationControllerFactory, pr: PostRepository, ea: EventAggregator){
    this.vc = vcf.createForCurrentScope();
    this.vcf = vcf;
    this.pr = pr;
    this.ea = ea;
  }

  attached() {
    this.ea.subscribe("post", post =>{
      this.title = post.title;
      this.body = post.body;
      this.visibility = post.visibility;
    });
  }

  editPost(postId){
    this.pr.savePostEditing(postId, this.title, this.body, this.visibility);
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
