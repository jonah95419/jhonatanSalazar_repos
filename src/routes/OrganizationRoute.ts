import { Router, Request, Response, NextFunction } from "express";

import validateRequest from "../middleware/ValidateRequest";
import { SchemaEnum } from "../constant/SchemaEnum";
import { OrganizationService } from "../service/OrganizationService";

const router: Router = Router();

router.get("", async (_req: Request, res: Response) => 
  res.send(await new OrganizationService().getOrganizations())
);

router.post(
  "",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      body: SchemaEnum.organization_create_request,
    }),
  async (req: Request, res: Response) =>
    res.send(await new OrganizationService().createOrganization(req.body))
);

router.put(
  "",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      body: SchemaEnum.organization_update_request,
    }),
  async (req: Request, res: Response) => 
    res.send(await new OrganizationService().updateOrganization(req.body))
);

router.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) =>
    validateRequest(req, res, next, {
      path: SchemaEnum.organization_delete_request,
    }),
  async (req: Request, res: Response) => 
    res.send(await new OrganizationService().deleteOrganization(req.body.id_organization))
);

export default router;
