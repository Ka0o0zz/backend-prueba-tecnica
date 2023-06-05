import { Request, Response } from "express";
import { NewsUseCase } from "../../application/news.useCases";

export class NewsController {
  constructor(private newsUseCase: NewsUseCase) {}

  public getNewsCtrl = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    const news = await this.newsUseCase.getNews({ keyword: keyword as string });
    res.status(200).json({
      ok: true,
      news,
    });
  };

  public getSaveNewsCtrl = async (_req: Request, res: Response) => {
    const news = await this.newsUseCase.getSaveNews();

    res.status(200).json({
      ok: true,
      news,
    });
  };

  public postSaveAndChangeNewsCtrl = async (req: Request, res: Response) => {
    const { news } = req.body;
    const createdOrChangeNews = await this.newsUseCase.changeAndSaveNews(news);

    res.status(200).json({
      ok: true,
      createdOrChangeNews,
    });
  };
}
