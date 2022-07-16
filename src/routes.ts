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
    deleteUserController,
    createMemberController,
    getMemberController,
    getMembersController,
    updateMemberController,
    deleteMemberController,
    createInstitutionController
} = new initializeControllers();

routes.post("/auth", authenticateUserController().handle);
routes.post("/users", ensureAuthenticated, createUserController().handle);
routes.get("/users/:id", getUserController().handle);
routes.patch("/users/:id", ensureAuthenticated, updateUserController().handle);
routes.delete("/users/:id", ensureAuthenticated, ensureAdmin, deleteUserController().handle);

routes.post("/institutions/:id/members", ensureAuthenticated, createMemberController().handle);
routes.get("/members/:id", getMemberController().handle);
routes.get("/institutions/:id/members", ensureAuthenticated, getMembersController().handle);
routes.patch("/members/:id", ensureAuthenticated, updateMemberController().handle);
routes.delete("/members/:id", ensureAuthenticated, deleteMemberController().handle);

routes.post("/institutions", ensureAuthenticated, createInstitutionController().handle)

export { routes };