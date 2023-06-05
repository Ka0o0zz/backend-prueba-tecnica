import { INews } from "../domain/news.entities";
import { NewsRepository } from "../infrastructure/repository/news.repository";

export class NewsUseCase {
  constructor(private readonly newsRepository: NewsRepository) {}

  public getNews({ keyword }: { keyword: string }) {
    const news = this.newsRepository.getNew({ keyword });
    return news;
  }

  public getSaveNews() {
    const news = this.newsRepository.getSaveNews();
    return news;
  }

  public changeAndSaveNews(newsToSaveOrChange: INews) {
    const news = this.newsRepository.changeAndSaveNews(newsToSaveOrChange);
    return news;
  }
}
