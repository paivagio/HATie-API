import { Member } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class DeleteMemberService {
    async execute({ id }: IRequest) {
        let member: Member;

        if (!id) return new BadRequestError("Member ID is required");

        try {
            member = await prismaClient.member.delete({
                where: {
                    id,
                }
            })
        } catch (err) {
            return new NotFoundError("Member not found");
        }

        return member;
    }
}

export { DeleteMemberService }