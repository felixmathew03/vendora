import { Router } from "express";
import * as user from "./requestHandler.js";
import Auth from "./middleware/Auth.js";

const router=Router();

router.route("/verifyemail").post(user.verifyEmail);

export default router;