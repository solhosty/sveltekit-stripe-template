import prisma from '$lib/prisma';
import { trpc } from '$lib/trpc/client';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, '/?error=unauthorized');
	}
	const user = await prisma.user.findUnique({
		where: {
			id: session?.user?.id
		}
	});
	if (event.url.pathname.endsWith('admin') && user?.role !== 'admin') {
		throw redirect(302, '/');
	}
	const completed = await trpc(event).getCompleted.query();
	const pending = await trpc(event).getPending.query();
	const cancelled = await trpc(event).getCancelled.query();
	const incomplete = await trpc(event).getIncomplete.query();

	return {
		session,
		completed,
		pending,
		incomplete,
		cancelled
	};
};
