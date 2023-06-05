import { pool } from "../../../../toolsConfig/pgConfig";
import { INews } from "../../domain/news.entities";

export class NewsStorePostgreSQL {
  constructor() {}

  public async findIfExistNewsTable() {
    const tableExists = await pool.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = 'savenews'
    );
  `);

    const tableExistsResult = tableExists.rows[0].exists;

    if (!tableExistsResult) {
      await pool.query(`
      CREATE TABLE savenews (
        id SERIAL PRIMARY KEY,
        title TEXT,
        description TEXT,
        url TEXT,
        urlToImage TEXT,
        isSaved BOOLEAN
      );
    `);
    }
  }

  public async findIfExistNews(urlToImage: string) {
    const recordExists = await pool.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM savenews
        WHERE urlToImage = $1
      );
    `,
      [urlToImage]
    );

    return recordExists.rows[0].exists;
  }

  public async changeSaveNews(urlToImage: string, isSaved: boolean) {
    await pool.query(
      `
      UPDATE savenews
      SET isSaved = $1
      WHERE urlToImage = $2;
    `,
      [!isSaved, urlToImage]
    );
    return true;
  }

  public async saveNews(news: INews) {
    await pool.query(
      `
        INSERT INTO savenews (title, description, url, urlToImage, isSaved)
        VALUES ($1, $2, $3, $4, $5);
      `,
      [news.title, news.description, news.url, news.urlToImage, true]
    );

    return true;
  }

  public async getSaveNews() {
    const result = await pool.query(`
      SELECT *
      FROM savenews
      WHERE isSaved = true;
    `);

    return result.rows.map((article: any) => ({
      ...article,
      urlToImage: article.urltoimage,
      isSaved: article.issaved,
    }));
  }

  public async updateNewsWithSaveStatus(newsList: INews[]): Promise<INews[]> {
    const updatedNewsList: INews[] = [];

    for (const news of newsList) {
      const queryResult = await pool.query(
        `
        SELECT EXISTS (
          SELECT 1
          FROM savenews
          WHERE urlToImage = $1 AND isSaved = true AND title = $2 AND description = $3
          LIMIT 1
        );
      `,
        [news.urlToImage, news.title, news.description]
      );

      const recordExists = queryResult.rows[0].exists;

      if (recordExists) {
        const updatedNews = { ...news, isSaved: true };
        updatedNewsList.push(updatedNews);
      } else {
        updatedNewsList.push(news);
      }
    }

    return updatedNewsList;
  }
}
