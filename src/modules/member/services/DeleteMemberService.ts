import { Member } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class DeleteMemberService {
    async execute({ id }: IRequest) {
        let member: Member;

        try {
            member = await prismaClient.member.delete({
                where: {
                    id,
                }
            })
        } catch (err) {
            return new NotFoundError("User not found");
        }

        return member;
    }
}

export { DeleteMemberService }