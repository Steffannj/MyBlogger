import { AccountType } from './../models/Account';
import { AccountRepository } from './AccountRepository';
import { Post, PostVisibility } from './../models/Post';
import { inject } from 'aurelia-framework';

@inject(AccountRepository)
export class PostRepository{
  private posts: Array<Post>;
  accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository){
    this.accountRepository = accountRepository;
    this.posts = [];
  }
  
  getPostByAuthor(author: string): Array<Post>{
    let postsByAuthor = this.posts.filter(post => post.author == author);
    return postsByAuthor;
  }

  getPosts(accountType: AccountType): Array<Post>{
    let publicPosts: Array<Post>;
    if(accountType == AccountType.User){
      publicPosts = this.posts.filter(post => post.visibility == PostVisibility.Public);
      return publicPosts;
    }
    return this.getAllPosts();  
  }

  private getAllPosts(){
    return this.posts;
  }

  addPost(post: Post){
    this.posts.push(post);
  }
  
  deletePost(postId: number){
    this.posts.forEach((post, index) => {
      if(post.postId == postId){
        this.posts.splice(index, 1);
      }
    });
  }

  changePost(changedPost: Post){
    let post = this.posts.find(post => post.postId == changedPost.postId);
    post.title = changedPost.title;
    post.body = changedPost.body;
    post.visibility = changedPost.visibility;
  }

}
