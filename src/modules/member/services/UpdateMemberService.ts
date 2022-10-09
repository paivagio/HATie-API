import { Member, Status } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    authorizations?: number;
    invitation?: Status;
}


class UpdateMemberService {
    async execute({ id, authorizations, invitation }: IRequest) {
        let member: Member;

        if (!id) return new BadRequestError("Member ID is required");

        try {
            member = await prismaClient.member.update({
                where: {
                    id,
                },
                data: {
                    authorizations: authorizations ? authorizations : undefined,
                    invitation: invitation ? invitation : undefined,
                    acceptedAt: invitation && invitation === Status.ACCEPTED ? new Date().toISOString() : undefined
                }
            });
        } catch (err) {
            return new NotFoundError("Member not found");
        }

        return member;
    }
}

export { UpdateMemberService }