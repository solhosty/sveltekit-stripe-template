import prisma from '$lib/prisma';
import { trpc } from '$lib/trpc/client';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, '/?error=unauthorized');
	}
	await prisma.user.findUnique({
		where: {
			id: session?.user?.id
		}
	});

	let appointments = await trpc(event).getUserAppointments.query();
	if (!appointments) {
		appointments = [];
	}

	return {
		appointments,
		session
	};
};
