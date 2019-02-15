import { Account } from './../models/Account';
import { Post, PostVisibility } from './../models/Post';
import { PostRepository } from './../repository/PostRepository';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";
import { PropagateUser } from 'utils/propagateUser';
import { Router } from 'aurelia-router';

@inject(PropagateUser, EventAggregator, PostRepository, Router)
export class UserProfile {
  currentUser: Account;
  ea: EventAggregator;
  postRepository: PostRepository;
  pu: PropagateUser;
  router: Router;
  search: string;
  searchResults:string;
  queriedPosts: Array<Post> = [];
  isInSearchMode: boolean = false;

  constructor(pu: PropagateUser, ea: EventAggregator, postRepository: PostRepository, router: Router) {
    this.ea = ea;
    this.postRepository = postRepository;
    this.pu = pu;
    this.router = router;
  }

  attached() {
    this.currentUser = this.pu.getCurrentUser();
    if(!this.currentUser){
      this.router.navigateToRoute("login");
    }
  }

  addPost(title: string, body: string, visibility: PostVisibility){
    let post = new Post(title, body, this.currentUser.username, visibility);
    this.postRepository.addPost(post);
    this.currentUser.addPost(post);
  }

  deletePost(post: Post){
    this.currentUser.removePost(post.postId);
    this.postRepository.deletePost(post.postId);
  }

  searchPost(search){
    this.isInSearchMode = true;
    this.queriedPosts = this.postRepository.getPostByAuthor(this.currentUser.username).filter(post => post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) || [];
    this.searchResults = search;
    this.search = "";
  }

  cancelSearch(){
    this.isInSearchMode = false;
    this.queriedPosts = [];
  }
}


