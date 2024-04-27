import z from 'zod';
import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const createAppointment = t.procedure
	.input(
		z.object({
			name: z.string(),
			type: z.string(),
			location: z.string().optional(),
			date: z.string(),
			dogId: z.string(),
			phone: z.string(),
			deposit: z.number()
		})
	)
	.query(async ({ input, ctx }) => {
		if (!ctx.user_id) {
			throw Error('User not authenticated');
		}
		const appointmentData = {
			name: input.name,
			type: input.type,
			location: input.location || '',
			date: input.date,
			phone: input.phone,
			completed: false,
			pending: false,
			cancelled: false,
			deposit: input.deposit,
			dog: {
				connect: {
					id: input.dogId
				}
			},
			user: {
				connect: {
					id: ctx.user_id
				}
			}
		};
		const appointment = await prisma.appointments.create({
			data: appointmentData
		});

		return appointment;
	});
