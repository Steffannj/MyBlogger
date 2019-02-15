export class Post{
  static postCounter = 0;
  postId: number;
  title: string;
  body: string;
  author: string;
  visibility: PostVisibility;
  time: Date;

  constructor(title, body, author, visibility){
    this.title = title;
    this.body = body;
    this.author = author;
    this.visibility = visibility;
    this.time = new Date();
    this.postId = Post.postCounter++;
  }
}

export enum PostVisibility {
  Public = "Public",
  Private = "Private"
}
