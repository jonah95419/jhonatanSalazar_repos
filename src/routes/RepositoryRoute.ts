import { Router, Request, Response, NextFunction } from "express";

import validateRequest from "../middleware/ValidateRequest";
import { SchemaEnum } from "../constant/SchemaEnum";
import { RepositoryService } from "../service/RepositoryService";

const router: Router = Router();

router.get(
  "/:id_tribe",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      path: SchemaEnum.tribe_get_request,
    }),
  async (_req: Request, res: Response) =>
    res.send(await new RepositoryService().getAllRepositories(1))
);

router.post(
  "",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      body: SchemaEnum.respository_create_request,
    }),
  async (req: Request, res: Response) =>
    res.send(await new RepositoryService().createRepository(req.body))
);

export default router;
