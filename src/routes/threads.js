import express from "express";
import {
  getAllThreads,
  getThreadById,
  createNewThread,
  updateExistingThread,
  deleteExistingThread,
} from "../controllers/threadController.js";

const router = express.Router();

router.get("/", getAllThreads);
router.get("/:id", getThreadById);
router.post("/", createNewThread);
router.put("/:id", updateExistingThread);
router.delete("/:id", deleteExistingThread);

export default router;
