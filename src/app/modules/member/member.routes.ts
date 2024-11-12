import express from "express";
import {
  createMember,
  deleteMember,
  getAllMembers,
  getMember,
  updateMember,
} from "./member.controller";

const router = express.Router();

router.route("/").get(getAllMembers).post(createMember);

router.route("/:id").get(getMember).put(updateMember).delete(deleteMember);

export const MemberRoutes = router;
