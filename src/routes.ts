import { Router } from "express";
import { initializeControllers } from "./initializeControllers";
import { FlacConverter } from "./middleware/conversionHandler";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { FileHandler } from "./middleware/fileHandler";
import { UploadFileToGoogleCloudStorageFromLocalStorage, UploadUnconvertedAudioToGCS } from "./middleware/uploadHandler";

const routes = Router();

const {
    authenticateUserController,
    createUserController,
    getUserController,
    getUserByEmailController,
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
    getGroupMembersController,
    updateGroupMemberController,
    deleteGroupMemberController,
    createPatientController,
    getPatientController,
    getPatientsController,
    updatePatientController,
    deletePatientController,
    createSummarizationController,
    getSummarizationController,
    updateSummarizationController,
    deleteSummarizationController
} = new initializeControllers();

routes.post("/auth", authenticateUserController().handle);
routes.post("/users", createUserController().handle);
routes.get("/users/:id", ensureAuthenticated, getUserController().handle);
routes.get("/users/:email/search", ensureAuthenticated, getUserByEmailController().handle);
routes.patch("/users/:id", ensureAuthenticated, updateUserController().handle);
routes.delete("/users/:id", ensureAuthenticated, deleteUserController().handle);

routes.post("/institutions/:id/members", ensureAuthenticated, createMemberController().handle);
routes.get("/members/:id", ensureAuthenticated, getMemberController().handle);
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
routes.get("/groups/:id/groupmembers", ensureAuthenticated, getGroupMembersController().handle);
routes.patch("/groupmembers/:id", ensureAuthenticated, updateGroupMemberController().handle);
routes.delete("/groupmembers/:id", ensureAuthenticated, deleteGroupMemberController().handle);

routes.post("/institutions/:id/patients", ensureAuthenticated, createPatientController().handle);
routes.get("/patients/:id", ensureAuthenticated, getPatientController().handle);
routes.get("/institutions/:id/patients", ensureAuthenticated, getPatientsController().handle);
routes.patch("/patients/:id", ensureAuthenticated, updatePatientController().handle);
routes.delete("/patients/:id", ensureAuthenticated, deletePatientController().handle);

routes.post("/patients/:id/summarizations", ensureAuthenticated, FileHandler, UploadUnconvertedAudioToGCS, FlacConverter, UploadFileToGoogleCloudStorageFromLocalStorage, createSummarizationController().handle);
routes.get("/summarizations/:id", ensureAuthenticated, getSummarizationController().handle);
routes.patch("/summarizations/:id", ensureAuthenticated, updateSummarizationController().handle);
routes.delete("/summarizations/:id", ensureAuthenticated, deleteSummarizationController().handle);

export { routes };