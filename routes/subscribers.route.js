import express from "express";
import {
  deleteSub,
  getSub,
  getSubs,
  postSub,
  updateSub,
} from "../controllers/subscriber.controller.js";

const router = express.Router();

router.route("/").get(getSubs).post(postSub);

router.route("/:id").get(getSub).put(updateSub).delete(deleteSub);

export default router;
