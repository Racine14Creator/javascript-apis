import express from "express"
import {getTests, postTest, getTest, updateTest, deleteTest} from "../controllers/test.controller.js"

const router = express.Router()

router.route("/").get(getTests).post(postTest)

router.route("/:id").get(getTest).put(updateTest).delete(deleteTest)

export default router