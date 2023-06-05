import { jest } from "@jest/globals";
import { NewsUseCase } from "../src/entities/news/application/news.useCases";
import { NewsRepository } from "../src/entities/news/infrastructure/repository/news.repository";
import { NewsStorePostgreSQL } from "../src/entities/news/infrastructure/store/news.PostgreSQL.store";
import { INews } from "../src/entities/news/domain/news.entities";

test("should return the default number of news", async () => {
  // Create an instance of the NewsRepository
  const newsStore = new NewsStorePostgreSQL();
  const newsRepository = new NewsRepository(newsStore);
  const newsUseCase = new NewsUseCase(newsRepository);

  const changeAndSaveNewsStub = jest
    .spyOn(newsRepository, "changeAndSaveNews")
    .mockResolvedValue(true);

  // Create a news object to save or change
  const newsToSaveOrChange: INews = {
    url: "https://example.com",
    title: "Example News",
    urlToImage: "https://example.com/image.jpg",
    description: "This is an example news article.",
    isSaved: true,
  };

  // Call the changeAndSaveNews function with the newsToSaveOrChange object
  const result = await newsUseCase.changeAndSaveNews(newsToSaveOrChange);

  // Verify that the result is true
  expect(result).toBe(true);
  // Verify that the changeAndSaveNews method of the repository was called once
  expect(changeAndSaveNewsStub).toHaveBeenCalledTimes(1);
  // Verify that the changeAndSaveNews method of the repository was called with the newsToSaveOrChange object
  expect(changeAndSaveNewsStub).toHaveBeenCalledWith(newsToSaveOrChange);

  // Restore the original behavior of the changeAndSaveNews method
  changeAndSaveNewsStub.mockRestore();
});

test("should return saved news", async () => {
  // Create an instance of the NewsRepository
  const newsStore = new NewsStorePostgreSQL();
  const newsRepository = new NewsRepository(newsStore);

  // Create an instance of the NewsUseCase with the NewsRepository
  const newsUseCase = new NewsUseCase(newsRepository);

  // Mock the behavior of the getSaveNews method
  const getSaveNewsStub = jest
    .spyOn(newsRepository, "getSaveNews")
    .mockResolvedValue([
      {
        url: "https://example.com/news1",
        title: "News 1",
        urlToImage: "https://example.com/image1.jpg",
        description: "This is news 1",
        isSaved: true,
      },
      {
        url: "https://example.com/news2",
        title: "News 2",
        urlToImage: "https://example.com/image2.jpg",
        description: "This is news 2",
        isSaved: true,
      },
    ]);

  // Call the getSavedNews function
  const savedNews = await newsUseCase.getSaveNews();

  // Verify that the savedNews array contains the expected news
  expect(savedNews).toHaveLength(2);
  expect(savedNews[0].title).toBe("News 1");
  expect(savedNews[1].title).toBe("News 2");

  // Verify that the getSaveNews method of the repository was called once
  expect(getSaveNewsStub).toHaveBeenCalledTimes(1);

  // Restore the original behavior of the getSaveNews method
  getSaveNewsStub.mockRestore();
});
