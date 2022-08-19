import { Member, Status } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    authorizations?: number;
    invitation?: Status;
}


class UpdateMemberService {
    async execute({ id, authorizations, invitation }: IRequest) {
        let member: Member;

        try {
            member = await prismaClient.member.update({
                where: {
                    id,
                },
                data: {
                    authorizations: authorizations ? authorizations : undefined,
                    invitation: invitation ? invitation : undefined
                }
            });
        } catch (err) {
            return new NotFoundError("User not found");
        }

        return member;
    }
}

export { UpdateMemberService }