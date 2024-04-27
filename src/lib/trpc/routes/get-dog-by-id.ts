import z from 'zod';
import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const getDogProfileById = t.procedure
	.input(
		z.object({
			id: z.string()
		})
	)
	.query(async ({ input }) => {
		const dogProfile = await prisma.dogProfile.findUnique({
			where: {
				id: input.id
			}
		});
		return dogProfile;
	});
