import { Status, User } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IGetUserRequest {
    id?: string;
    email?: string;
};

class GetUserService {
    async execute({ id, email }: IGetUserRequest) {
        if (!id && !email) return new BadRequestError("User ID or email is required");

        let user: User;

        if (id) {
            user = await prismaClient.user.findFirst({
                where: {
                    id,
                },
                select: {
                    id: true,
                    fullname: true,
                    email: true,
                    password: true,
                    isAdmin: true,
                    preferences: true,
                    createdAt: true,
                    updatedAt: true,
                    Institution: {
                        select: {
                            id: true,
                            ownerId: true,
                            name: true,
                            createdAt: true,
                            updatedAt: true,
                            _count: {
                                select: {
                                    Member: true,
                                }
                            }
                        }
                    },
                    Member: {
                        include: {
                            Institution: {
                                select: {
                                    id: true,
                                    ownerId: true,
                                    name: true,
                                    createdAt: true,
                                    updatedAt: true,
                                    _count: {
                                        select: {
                                            Member: true,
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
            })
        } else {
            user = await prismaClient.user.findFirst({
                where: {
                    email
                },
            })
        };

        if (!user) {
            return new NotFoundError("User not found");
        }

        user.password = null;
        return user;
    }
}

export { GetUserService }