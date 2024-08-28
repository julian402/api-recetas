import express from "express";
import controller from "../controllers/controller.js";
import validation from '../middlewares/validation.js'

const router = express.Router();

router.get("/api/recipes",controller.getAll);
router.get("/api/recipes/:id", controller.find);
router.post("/api/recipes",validation.create, controller.create);
router.patch("/api/recipes/:id",validation.update, controller.update);
router.delete("/api/recipes/:id",controller.destroy)

export default router;
