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
  searchByTitle: string;
  searchByAuthor: string;
  searchResults: string;
  queriedPosts: Array<Post> = [];
  isInSearchMode: boolean = false;
  searchOptions = ["title", "author"];
  searchOption = "title";
  search: string;

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

  searchPostByTitle(search: string) {
    this.isInSearchMode = true;
    this.queriedPosts = this.pr.getPosts(this.currentUser.accountType).filter(post =>
      post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    this.searchResults = search;
  }

  searchPostByAuthor(search: string) {
    this.isInSearchMode = true;
    this.queriedPosts = this.pr.getPosts(this.currentUser.accountType).filter(post =>
      post.author.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    this.searchResults = search;
  }

  cancelSearch() {
    this.isInSearchMode = false;
    this.queriedPosts = [];
    this.search = "";
  }

}
