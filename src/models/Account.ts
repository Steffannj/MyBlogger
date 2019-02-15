import { Post } from './Post';

export class Account{
  static idCounter = 0;
  accountId: number;
  accountType: AccountType;
  username: string;
  password: string;
  blogPosts: Array<Post>;

  constructor(username, password, accountType: AccountType){
    this.accountId = Account.idCounter++;
    this.username = username;
    this.password = password;
    this.accountType = accountType;
  }

  addPost(post: Post){
    this.blogPosts.push(post);
  }

  removePost(postId: number){
    this.blogPosts.forEach((post, index) => {
      if(post.postId === postId) {
        this.blogPosts.splice(index, 1);
        return;
      }
    });
  }
  
}

export enum AccountType{
  User = "User",
  Admin = "Admin"
}

