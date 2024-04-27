import z from 'zod';
import prisma from '$lib/prisma';
import { t } from '$lib/trpc/t';

export const approveAppointment = t.procedure
	.input(
		z.object({
			id: z.string()
		})
	)
	.query(async ({ input, ctx }) => {
		const appointment = await prisma.appointments.findFirst({
			where: {
				id: input.id
			}
		});
		if (!appointment) return null;
		const appointmentData = {
			name: appointment.name,
			type: appointment.type,
			location: appointment.location,
			completed: false,
			cancelled: false,
			pending: true,
			deposit: appointment.deposit,
			user: {
				connect: {
					id: ctx.user_id
				}
			}
		};
		if (appointment) {
			const e = await prisma.appointments.update({
				data: appointmentData,
				where: {
					id: input.id
				}
			});
			return e;
		}
	});
