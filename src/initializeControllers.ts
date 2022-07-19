import { AuthenticateUserController } from "./modules/authentication/AuthenticateUserController";
import { CreateGroupMemberController } from "./modules/groupMember/controllers/CreateGroupMemberController";
import { DeleteGroupMemberController } from "./modules/groupMember/controllers/DeleteGroupMemberController";
import { GetGroupMemberController } from "./modules/groupMember/controllers/GetGroupMemberContreoller";
import { UpdateGroupMemberController } from "./modules/groupMember/controllers/UpdateGroupMemberController";
import { CreateGroupController } from "./modules/groups/controllers/CreateGroupController";
import { DeleteGroupController } from "./modules/groups/controllers/DeleteGroupController";
import { GetGroupController } from "./modules/groups/controllers/GetGroupController";
import { UpdateGroupController } from "./modules/groups/controllers/UpdateGroupController";
import { CreateInstitutionController } from "./modules/institution/controllers/CreateInstitutionController";
import { DeleteInstitutionController } from "./modules/institution/controllers/DeleteInstitutionController";
import { GetInstitutionController } from "./modules/institution/controllers/GetInstitutionController";
import { UpdateInstitutionController } from "./modules/institution/controllers/UpdateInstitutionController";
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
    getInstitutionController = () => { return new GetInstitutionController() };
    updateInstitutionController = () => { return new UpdateInstitutionController() };
    deleteInstitutionController = () => { return new DeleteInstitutionController() };

    createGroupController = () => { return new CreateGroupController() };
    getGroupController = () => { return new GetGroupController() };
    updateGroupController = () => { return new UpdateGroupController() };
    deleteGroupController = () => { return new DeleteGroupController() };

    createGroupMemberController = () => { return new CreateGroupMemberController() };
    getGroupMemberController = () => { return new GetGroupMemberController() };
    updateGroupMemberController = () => { return new UpdateGroupMemberController() };
    deleteGroupMemberController = () => { return new DeleteGroupMemberController() };
}

export { initializeControllers };