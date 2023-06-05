import { Router } from "express";
import { NewsUseCase } from "../../application/news.useCases";
import { NewsController } from "../controller/news.controller";
import { NewsRepository } from "../repository/news.repository";
import { errorNewsHandlerMiddleware } from "../errors/news.errors";
import { asyncMiddleware } from "../../../../middlewares/asyncMiddleware";
import { NewsStorePostgreSQL } from "../store/news.PostgreSQL.store";
import { validateMiddleware } from "../../../../middlewares/validateMiddleware";
import { saveNewsSchema } from "../schemaJOI/news.schema.JOI";

enum NEWS_API_PATS {
  INITIAL_NEWS = "/",
  SAVE_AND_CHANGE_NEWS = "/save-and-change",
  GET_SAVE_NEWS = "/save-news",
}

const newsStore = new NewsStorePostgreSQL();
const newsRepository = new NewsRepository(newsStore);
const newsUseCase = new NewsUseCase(newsRepository);
const newsCtrl = new NewsController(newsUseCase);

const router = Router();

router.get(NEWS_API_PATS.INITIAL_NEWS, asyncMiddleware(newsCtrl.getNewsCtrl));
router.get(
  NEWS_API_PATS.GET_SAVE_NEWS,
  asyncMiddleware(newsCtrl.getSaveNewsCtrl)
);

router.post(
  NEWS_API_PATS.SAVE_AND_CHANGE_NEWS,
  validateMiddleware(saveNewsSchema),
  asyncMiddleware(newsCtrl.postSaveAndChangeNewsCtrl)
);

router.use(errorNewsHandlerMiddleware);

export default router;
