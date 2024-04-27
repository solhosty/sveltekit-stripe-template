import z from 'zod';
import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const createDogProfile = t.procedure
	.input(
		z.object({
			name: z.string(),
			breed: z.string(),
			age: z.number(),
			special_instructions: z.string(),
			aggressive: z.boolean(),
			weight: z.number()
		})
	)
	.query(async ({ ctx, input }) => {
		const dogProfile = await prisma.dogProfile.create({
			data: {
				name: input.name,
				breed: input.breed,
				age: input.age,
				special_instructions: input.special_instructions,
				aggressive: input.aggressive,
				weight: input.weight,
				userId: ctx?.user_id || ''
			}
		});
		return dogProfile;
	});
