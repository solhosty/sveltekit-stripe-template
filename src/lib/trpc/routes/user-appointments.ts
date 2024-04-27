import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const getUserAppointments = t.procedure.query(async ({ ctx }) => {
	const appointments = await prisma.appointments.findMany({
		where: {
			user: { id: ctx.user_id }
		}
	});

	return appointments;
});
