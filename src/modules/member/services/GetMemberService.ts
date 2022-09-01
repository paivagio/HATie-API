import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetMemberService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Member ID is required");

        const member = await prismaClient.member.findFirst({
            where: {
                id,
            }
        });

        if (!member) {
            return new NotFoundError("Member not found");
        }

        return member;
    }
}

export { GetMemberService }