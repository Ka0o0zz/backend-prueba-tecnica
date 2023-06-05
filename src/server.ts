import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { AppRouter } from "./router";
import { pool } from "./toolsConfig/pgConfig";

export class Server {
  private app: Application;
  private port: number;
  private appRouter: AppRouter;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.appRouter = new AppRouter();
    this.setupMiddlewares();
    this.dbConnection();
    this.setupRoutesNotFound();
  }

  private setupMiddlewares() {
    //cors
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(helmet());

    //router
    this.app.use(this.appRouter.appRouter);
  }

  async dbConnection() {
    try {
      pool;
      console.log("database is running");
    } catch (err) {
      console.log(err);
    }
  }

  private setupRoutesNotFound() {
    this.app.use((_req: Request, res: Response) => {
      res.status(404).send("Route not found");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
