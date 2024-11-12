import { Router } from "express";
import { BookRoutes } from "../modules/book/book.routes";
import { MemberRoutes } from "../modules/member/member.routes";
import { BorrowRecordRoutes } from "../modules/borrow/borrow.routes";

const router = Router();

// Define the routes for each module
const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/members",
    route: MemberRoutes,
  },
  {
    path: "/borrow",
    route: BorrowRecordRoutes,
  },
];

// Register each module route with the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
