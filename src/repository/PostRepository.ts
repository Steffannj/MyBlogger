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
    this.posts = [
      new Post("Title", "Body of post", this.accountRepository.accounts[1].username, PostVisibility.Public),
      new Post("Title2", "Body of post2", this.accountRepository.accounts[0].username, PostVisibility.Public),
      new Post("Private", "Body of private post", this.accountRepository.accounts[1].username, PostVisibility.Private)
    ];
  }
  
  getPostByAuthor(author: string): Array<Post>{
    let postsByAuthor = this.posts.filter(post => post.author == author);
    return postsByAuthor;
  }

  getPosts(accountType: AccountType): Array<Post>{
    let publicPosts: Array<Post>;
    if(accountType == AccountType.User){
      publicPosts = this.posts.filter(post => post.isPublic == PostVisibility.Public);
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

}
