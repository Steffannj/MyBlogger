import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';

@inject(ValidationControllerFactory, EventAggregator)
export class AddPostModal {
  title: string;
  body: string;
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  canSave: boolean;
  ea: EventAggregator;

  constructor(vcf: ValidationControllerFactory, ea: EventAggregator) {
    this.vc = vcf.createForCurrentScope();
    this.vcf = vcf;
    this.ea = ea;
    this.ea.subscribe("addPostValidation", res => this.canSave = res);
  }

  addPostValidation(){
    if(this.title.length < 3 || this.body.length < 20)
      this.ea.publish("addPostValidation", false);
    else
      this.ea.publish("addPostValidation", true);
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
