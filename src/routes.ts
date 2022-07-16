import { Router } from "express";
import { initializeControllers } from "./initializeControllers";
import { ensureAdmin } from "./middleware/ensureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const routes = Router();

const {
    authenticateUserController,
    createUserController,
    getUserController,
    updateUserController,
    deleteUserController
} = new initializeControllers();

routes.post("/auth", authenticateUserController().handle);
routes.post("/users", ensureAuthenticated, createUserController().handle);
routes.get("/users/:id", getUserController().handle);
routes.patch("/users/:id", ensureAuthenticated, updateUserController().handle);
routes.delete("/users/:id", ensureAuthenticated, ensureAdmin, deleteUserController().handle);

export { routes };