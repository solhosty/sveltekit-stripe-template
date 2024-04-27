import z from 'zod';
import { t } from '$lib/trpc/t';
import prisma from '$lib/prisma';

export const getPending = t.procedure.query(async ({ ctx }) => {
	const appointments = await prisma.appointments.findMany({
		where: {
			completed: false,
			pending: false,
			cancelled: false
		}
	});

	return appointments;
});

export const getCompleted = t.procedure.query(async ({ ctx }) => {
	const appointments = await prisma.appointments.findMany({
		where: {
			completed: true,
			pending: false,
			cancelled: false
		}
	});

	return appointments;
});
export const getIncomplete = t.procedure.query(async ({ ctx }) => {
	const appointments = await prisma.appointments.findMany({
		where: {
			completed: false,
			pending: true,
			cancelled: false
		}
	});

	return appointments;
});
export const getCancelled = t.procedure.query(async ({ ctx }) => {
	const appointments = await prisma.appointments.findMany({
		where: {
			completed: false,
			pending: false,
			cancelled: true
		}
	});

	return appointments;
});
