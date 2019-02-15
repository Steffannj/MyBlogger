import { PostVisibility } from './../models/Post';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';

@inject(ValidationControllerFactory, EventAggregator)
export class AddPostModal {
  title: string;
  body: string;
  visibility: PostVisibility = PostVisibility.Public;
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  canSave: boolean = false;
  ea: EventAggregator;
  visibilityOptions = [PostVisibility.Public, PostVisibility.Private];

  constructor(vcf: ValidationControllerFactory, ea: EventAggregator) {
    this.vc = vcf.createForCurrentScope();
    this.vcf = vcf;
    this.ea = ea;
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
