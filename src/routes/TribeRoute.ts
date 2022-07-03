import { Router, Request, Response, NextFunction } from "express";

import validateRequest from "../middleware/ValidateRequest";
import { SchemaEnum } from "../constant/SchemaEnum";
import { TribeService } from "../service/TribeService";

const router: Router = Router();

router.get(
  "/:id_tribe",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      path: SchemaEnum.tribe_get_request,
    }),
  async (req: Request, res: Response) =>
    res.send(await new TribeService().getAllTribesById(req.body.id_tribe))
);

router.post(
  "",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      body: SchemaEnum.tribe_create_request,
    }),
  async (req: Request, res: Response) =>
    res.send(await new TribeService().createTribe(req.body))
);

export default router;
