import z from 'zod';
import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const getDogProfiles = t.procedure.query(async ({ ctx }) => {
	const dogProfiles = await prisma.dogProfile.findMany({
		where: {
			userId: ctx?.user_id
		}
	});
	return dogProfiles;
});
