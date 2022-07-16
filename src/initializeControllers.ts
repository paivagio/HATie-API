import { AuthenticateUserController } from "./modules/authentication/AuthenticateUserController";
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
}

export { initializeControllers };