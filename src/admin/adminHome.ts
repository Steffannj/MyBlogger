import { AccountRepository } from './../repository/AccountRepository';
import { Router } from 'aurelia-router';
import { Account } from './../models/Account';
import { Post } from './../models/Post';
import { PostRepository } from './../repository/PostRepository';
import { inject } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';
import { PropagateUser } from 'utils/propagateUser';

@inject(PropagateUser, PostRepository, EventAggregator, Router, AccountRepository)
export class AdminHome {
  posts: Array<Post>;
  currentUser: Account;
  ea: EventAggregator;
  pr: PostRepository;
  ar: AccountRepository;
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

  constructor(pu: PropagateUser, pr: PostRepository, ea: EventAggregator, router: Router, ar: AccountRepository) {
    this.pr = pr;
    this.ea = ea;
    this.pu = pu;
    this.router = router;
    this.ar = ar;
  }

  attached() {
    this.currentUser = this.pu.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigateToRoute("login");
    }
    this.posts = this.pr.getPosts(this.currentUser.accountType);
  }

  deletePost(post: Post) {
    if (window.confirm("Are you sure you want to delete post?")) {
      let account = this.ar.getAccount(post.author);
      account.removePost(post.postId);
      this.pr.deletePost(post.postId);
    }
  }

  publishPost(post: Post) {
    this.ea.publish("post", post);
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
