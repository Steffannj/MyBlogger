import { PropagateUser } from './../utils/propagateUser';
import { PostRepository } from './../repository/PostRepository';
import { Post } from './../models/Post';
import { Account } from './../models/Account';
import { AccountRepository } from './../repository/AccountRepository';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";

@inject(Router, EventAggregator, AccountRepository, PostRepository, PropagateUser)
export class AdminPage {
  currentUser: Account;
  ea: EventAggregator;
  router: Router;
  accountRepository: AccountRepository;
  listOfAccounts: Array<Account>;
  listOfPosts: Array<Post>;
  postRepository: PostRepository;
  selectedAccount: Account;
  pu: PropagateUser;

  constructor(router: Router, ea: EventAggregator, au: AccountRepository, postRepository: PostRepository, pu: PropagateUser) {
    this.ea = ea;
    this.router = router;
    this.accountRepository = au;
    this.pu = pu;
    this.currentUser = pu.getCurrentUser();
    this.postRepository = postRepository;
  }

  attached() {
    if (!this.currentUser) {
      this.router.navigateToRoute("login");
    }
    this.listOfAccounts = this.accountRepository.getAllAccounts();
    this.listOfPosts = this.postRepository.getPosts(this.currentUser.accountType);
  }

  deleteAccount(accountId: number) {
    this.postRepository.deletePostsByAuthor(this.selectedAccount.username);
    this.accountRepository.deleteAccount(accountId);
  }

  publishPost(post: Post) {
    this.ea.publish("post", post);
  }

  editAccount(){
    this.ea.publish("editAccount", this.selectedAccount);
  }

  deletePost(post: Post) {
    let account = this.accountRepository.getAccount(post.author);
    account.removePost(post.postId);
    this.postRepository.deletePost(post.postId);
  }
}
