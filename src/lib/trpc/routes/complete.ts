import z from 'zod';
import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const completeAppointment = t.procedure
	.input(
		z.object({
			id: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const appointment = await prisma.appointments.findMany({
			where: {
				id: input.id
			}
		});
		if (!appointment) return;
		const completedAppointment = await prisma.appointments.update({
			where: {
				id: input.id
			},
			data: {
				completed: true,
				pending: false,
				cancelled: false
			}
		});

		return completedAppointment;
	});
