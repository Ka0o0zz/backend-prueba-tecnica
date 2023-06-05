import { Router } from "express";
import newsRouter from "./entities/news/infrastructure/network/news.network";

export class AppRouter {
  private router: Router;
  private apiPath = {
    news: "/api/news",
  };

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.use(this.apiPath.news, newsRouter);
  }

  public get appRouter() {
    return this.router;
  }
}
