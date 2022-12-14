import { Router } from "express";
import createClassificationController from "../controllers/classifications/createClassification.controller";
import deleteClassificationController from "../controllers/classifications/deleteClassification.controller";
import { listClassificationsController } from "../controllers/classifications/listClassifications.controller";
import { showClassificationIdByNameController } from "../controllers/classifications/showClassificationIdByName.controller";
import updateClassificationController from "../controllers/classifications/updateClassification.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const classificationRoutes = Router();

classificationRoutes.get(
  "/name/:name",
  ensureAuthMiddleware,
  showClassificationIdByNameController
);

classificationRoutes.get(
  "",
  ensureAuthMiddleware,
  listClassificationsController
);

classificationRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createClassificationController
);

classificationRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  updateClassificationController
);

classificationRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteClassificationController
);

export default classificationRoutes;
