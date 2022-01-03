import { Router } from "express";

// middlewares
import { auth } from "../middlewares/auth";

// handlers
import { login } from "../controllers/users/login/login";
import { signup } from "../controllers/users/singup/signup";
import { googleAuth } from "../controllers/users/auth/google/googleAuth";
import { facebookAuth } from "../controllers/users/auth/facebook/facebookAuth";
import { sendVerificationEmail } from "../controllers/users/sendVerificationEmail/sendVerificationEmail";
import { verifyCode } from "../controllers/users/verifyCode/verifiyCode";
import { resetPassword } from "../controllers/users/resetPassword/resetPassword";

const router: Router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/auth/google", googleAuth);
router.post("/auth/facebook", facebookAuth);
router.post("/sendVerificationEmail", sendVerificationEmail);
router.post("/verifyCode", verifyCode);
router.put("/resetPassword", auth, resetPassword);

export default router;
