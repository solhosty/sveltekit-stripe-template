import z from 'zod';
import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const deleteAppointment = t.procedure
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
		const deletedAppointment = await prisma.appointments.delete({
			where: {
				id: input.id
			}
		});

		return deletedAppointment;
	});
