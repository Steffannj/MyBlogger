import { Router } from 'aurelia-router';
import { Account } from './../models/Account';
import { Post } from './../models/Post';
import { PostRepository } from './../repository/PostRepository';
import { inject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';
import { PropagateUser } from 'utils/propagateUser';

@inject(PropagateUser, PostRepository, EventAggregator, Router)
export class Home {
  posts: Array<Post>;
  currentUser: Account;
  ea: EventAggregator;
  pr: PostRepository;
  pu: PropagateUser;
  router: Router;
  search: string;
  searchResults:string;

  constructor(pu: PropagateUser, pr: PostRepository, ea: EventAggregator, router: Router) {
    this.pr = pr;
    this.ea = ea;
    this.pu = pu;
    this.router = router;
  }

  attached() {
    this.currentUser = this.pu.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigateToRoute("login");
    }
    this.posts = this.pr.getPosts(this.currentUser.accountType);
  }

  searchPost(search: string) {
    this.posts = this.pr.getPosts(this.currentUser.accountType).filter(post =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      post.author.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
      this.searchResults = search;
      console.log(this.posts);
      this.search = "";
  }
}
