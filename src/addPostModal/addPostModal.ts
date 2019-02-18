import { PropagateUser } from './../utils/propagateUser';
import { PostRepository } from './../repository/PostRepository';
import { PostVisibility, Post } from './../models/Post';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';

@inject(ValidationControllerFactory, EventAggregator, PostRepository, PropagateUser)
export class AddPostModal {
  title: string;
  body: string;
  visibility: PostVisibility = PostVisibility.Public;
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  ea: EventAggregator;
  visibilityOptions = [PostVisibility.Public, PostVisibility.Private];
  pr: PostRepository;
  pu: PropagateUser;

  constructor(vcf: ValidationControllerFactory, ea: EventAggregator, pr: PostRepository, pu: PropagateUser) {
    this.vc = vcf.createForCurrentScope();
    this.vcf = vcf;
    this.ea = ea;
    this.pr = pr;
    this.pu = pu;
  }

  addPost() {
    let post = new Post(this.title, this.body, this.pu.getCurrentUser().username, this.visibility);
    this.pr.addPost(post);
    this.pu.getCurrentUser().addPost(post);
    this.title = "";
    this.body = "";
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
  .on(AddPostModal);
