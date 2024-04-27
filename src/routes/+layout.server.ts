import { loadServices, loadTestimonials } from '$lib/graphql';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	return {
		session: {
			user: {
				name: session?.user?.name,
				image: session?.user?.image,
				id: session?.user?.id
			}
		},
		testimonials: await loadTestimonials(),
		services: await loadServices()
	};
};
