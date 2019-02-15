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
  posts: Array<Post>
  router: Router;
  search: string;
  searchResults:string;

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
    this.posts = this.getPosts();
   }

  addPost(title: string, body: string){
    let post = new Post(title, body, this.currentUser.username, PostVisibility.Public);
    this.postRepository.addPost(post);    
    this.posts = this.getPosts();
  }

  deletePost(post: Post){
    this.postRepository.deletePost(post.postId);
    this.posts = this.getPosts();
  }

  editPost(post: Post, title: string, body: string){
    post.title = title;
    post.body = body;
  }

  searchPost(search){
    this.posts = this.postRepository.getPostByAuthor(this.currentUser.username).filter(post => post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    this.searchResults = search;
    this.search = "";
  }

  getPosts(){
    return this.postRepository.getPostByAuthor(this.currentUser.username);
  }
}


