import { Router, Request, Response, NextFunction } from "express";

import { MetricsService } from "../service/MetricsService";

import validateRequest from "../middleware/ValidateRequest";
import { SchemaEnum } from "../constant/SchemaEnum";

const router: Router = Router();

router.get("", async (_req: Request, res: Response) =>
  res.send(await new MetricsService().getAllMetrics())
);

router.post(
  "",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      body: SchemaEnum.metrics_create_request,
    }),
  async (req: Request, res: Response) =>
    res.send(await new MetricsService().createMetrics(req.body))
);

export default router;
