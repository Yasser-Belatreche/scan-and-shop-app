import { Router } from "express";

// routes
import usersRoutes from "./users";
import productsRoutes from "./products";

const router: Router = Router();

router.use("/users", usersRoutes);
router.use("/products", productsRoutes);

export default router;
