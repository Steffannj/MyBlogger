export class Post{
  static postCounter = 0;
  postId: number;
  title: string;
  body: string;
  author: string;
  isPublic: PostVisibility;
  time: Date;

  constructor(title, body, author, isPublic){
    this.title = title;
    this.body = body;
    this.author = author;
    this.isPublic = isPublic;
    this.time = new Date();
    this.postId = Post.postCounter++;
  }
}

export enum PostVisibility {
  Public = "Public",
  Private = "Private"
}
