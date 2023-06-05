import { axiosCall } from "../../../../services/services.";
import { INews, ResponseNews } from "../../domain/news.entities";
import { NewsStorePostgreSQL } from "../store/news.PostgreSQL.store";

export class NewsRepository {
  constructor(private store: NewsStorePostgreSQL) {}

  public async getNew({ keyword }: { keyword: string }) {
    const call = await axiosCall(
      `https://newsapi.org/v2/everything?q=${keyword}&language=es&pageSize=100&apiKey=d820790438f2437398fdac387c72f3b9`
    );

    const news = call.articles
      .filter(
        (article: ResponseNews) =>
          article.urlToImage !== null && article.urlToImage !== ""
      )
      .slice(0, 20);

    const newsWithState = news.map((article: ResponseNews) => ({
      ...article,
      isSaved: false,
    }));

    const thereSomeoneSaved =
      this.store.updateNewsWithSaveStatus(newsWithState);

    return thereSomeoneSaved;
  }

  public async getSaveNews() {
    const news = await this.store.getSaveNews();
    return news;
  }

  public async changeAndSaveNews(createdOrChangeNews: INews) {
    await this.store.findIfExistNewsTable();
    const existNews = await this.store.findIfExistNews(
      createdOrChangeNews.urlToImage
    );

    if (existNews) {
      await this.store.changeSaveNews(
        createdOrChangeNews.urlToImage,
        createdOrChangeNews.isSaved
      );
      return true;
    }

    await this.store.saveNews(createdOrChangeNews);
    return true;
  }
}
