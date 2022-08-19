import { Status } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IGetUserRequest {
    id: string;
};

class GetUserService {
    async execute({ id }: IGetUserRequest) {

        const user = await prismaClient.user.findFirst({
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

        if (!user) {
            return new NotFoundError("User not found");
        }

        return user;
    }
}

export { GetUserService }