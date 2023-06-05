export interface INews {
  url: string;
  title: string;
  urlToImage: string;
  description: string;
  isSaved: boolean;
}

export interface ResponseNews extends INews {
  source: {
    id: string;
    name: string;
  };
  author: string;
  publishedAt: string;
  content: string;
}
