import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetMemberService {
    async execute({ id }: IRequest) {

        const member = await prismaClient.member.findFirst({
            where: {
                id,
            }
        });

        if (!member) {
            return new NotFoundError("User not found");
        }

        return member;
    }
}

export { GetMemberService }