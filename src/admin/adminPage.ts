import { PostRepository } from './../repository/PostRepository';
import { Post } from './../models/Post';
import { Account } from './../models/Account';
import { AccountRepository } from './../repository/AccountRepository';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";

@inject(Router, EventAggregator, AccountRepository, PostRepository)
export class AdminPage {
  currentUser: Account;
  ea: EventAggregator;
  router: Router;
  accountRepository: AccountRepository;
  listOfAccounts: Array<Account>;
  listOfPosts: Array<Post>;
  postRepository: PostRepository;
  selectedAccount: Account;

  constructor(router: Router, ea: EventAggregator, au: AccountRepository, postRepository: PostRepository) {
    this.ea = ea;
    this.router = router;
    this.accountRepository = au;
    this.ea.subscribe("account", acc => {
      this.currentUser = acc;
    });
    this.postRepository = postRepository;
  }

  attached() {
    /*if (!this.currentUser) {
      this.router.navigateToRoute("login");
    }*/
    this.listOfAccounts = this.accountRepository.getAllAccounts();
    this.listOfPosts = this.postRepository.getPosts(this.currentUser.accountType);
  }

  deleteAccount(accountId: number){
    this.accountRepository.deleteAccount(accountId);
  }

  publishPost(post: Post){
    this.ea.publish("post", post);
  }

  deletePost(post: Post){
    let account = this.accountRepository.getAccount(post.author);
    account.removePost(post.postId);
    this.postRepository.deletePost(post.postId);
  }
}
