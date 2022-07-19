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
    createInstitutionController,
    getInstitutionController,
    updateInstitutionController,
    deleteInstitutionController,
    createGroupController,
    getGroupController,
    updateGroupController,
    deleteGroupController,
    createGroupMemberController,
    getGroupMemberController,
    updateGroupMemberController,
    deleteGroupMemberController
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

routes.post("/institutions", ensureAuthenticated, createInstitutionController().handle);
routes.get("/institutions/:id", ensureAuthenticated, getInstitutionController().handle);
routes.patch("/institutions/:id", ensureAuthenticated, updateInstitutionController().handle);
routes.delete("/institutions/:id", ensureAuthenticated, deleteInstitutionController().handle);

routes.post("/institutions/:id/groups", ensureAuthenticated, createGroupController().handle);
routes.get("/groups/:id", ensureAuthenticated, getGroupController().handle);
routes.patch("/groups/:id", ensureAuthenticated, updateGroupController().handle);
routes.delete("/groups/:id", ensureAuthenticated, deleteGroupController().handle);

routes.post("/groups/:id/groupmembers", ensureAuthenticated, createGroupMemberController().handle);
routes.get("/groupmembers/:id", ensureAuthenticated, getGroupMemberController().handle);
routes.patch("/groupmembers/:id", ensureAuthenticated, updateGroupMemberController().handle);
routes.delete("/groupmembers/:id", ensureAuthenticated, deleteGroupMemberController().handle);

export { routes };