import { AuthenticateUserController } from "./modules/authentication/AuthenticateUserController";
import { CreateInstitutionController } from "./modules/institution/controllers/CreateInstitutionController";
import { CreateMemberController } from "./modules/member/controllers/CreateMemberController";
import { DeleteMemberController } from "./modules/member/controllers/DeleteMemberController";
import { GetMemberController } from "./modules/member/controllers/GetMemberController";
import { GetMembersController } from "./modules/member/controllers/GetMembersController";
import { UpdateMemberController } from "./modules/member/controllers/UpdateMemberController";
import { CreateUserController } from "./modules/user/controllers/CreateUserController";
import { DeleteUserController } from "./modules/user/controllers/DeleteUserController";
import { GetUserController } from "./modules/user/controllers/GetUserController";
import { UpdateUserController } from "./modules/user/controllers/UpdateUserController";

class initializeControllers {
    authenticateUserController = () => { return new AuthenticateUserController() };

    createUserController = () => { return new CreateUserController() };
    getUserController = () => { return new GetUserController() };
    updateUserController = () => { return new UpdateUserController() };
    deleteUserController = () => { return new DeleteUserController() };

    createMemberController = () => { return new CreateMemberController() };
    getMemberController = () => { return new GetMemberController() };
    getMembersController = () => { return new GetMembersController() };
    updateMemberController = () => { return new UpdateMemberController() };
    deleteMemberController = () => { return new DeleteMemberController() };

    createInstitutionController = () => { return new CreateInstitutionController() };
}

export { initializeControllers };