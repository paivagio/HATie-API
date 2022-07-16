import { Member } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    authorizations: number;
}


class UpdateMemberService {
    async execute({ id, authorizations }: IRequest) {
        let member: Member;

        try {
            member = await prismaClient.member.update({
                where: {
                    id,
                },
                data: {
                    authorizations: authorizations
                }
            });
        } catch (err) {
            return new NotFoundError("User not found");
        }

        return member;
    }
}

export { UpdateMemberService }