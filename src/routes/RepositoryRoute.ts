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
  async (req: Request, res: Response) =>
    res.send(await new RepositoryService().getAllRepositories(req.body.id_tribe))
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

router.get(
  "/report/:id_tribe",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
       path: SchemaEnum.tribe_get_request,
    }),
  async (req: Request, res: Response) => {
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.send(await new RepositoryService().reportRepositoryFile(req.body.id_tribe))
  }
);

export default router;
